import { Recruitment, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class RecruitmentService {
    static async setRecruitment({ recruitmentId, user_id, toUpdate }) {
        let recruitment = await Recruitment.findById({ recruitmentId });

        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        console.log(recruitment._doc);
        if (recruitment._doc.captain.id !== user_id) {
            const errorMessage = '수정할 수 없습니다.';
            throw new Error(errorMessage);
        }

        console.log(toUpdate);
        const keys = Object.keys(toUpdate);
        const values = Object.values(toUpdate);

        for (let i = 0; i < keys.length; i++) {
            recruitment = await Recruitment.update(
                recruitmentId,
                keys[i],
                values[i]
            );
            console.log(keys[i], values[i]);
        }

        return recruitment;
    }

    // 게시물 1개보기
    static async getRecruitment({ recruitmentId }) {
        const recruitment = await Recruitment.findById({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }
        return recruitment;
    }

    static async likeRecruitment({ recruitmentId, user_id }) {
        let likedRecruitment = await Recruitment.findById({ recruitmentId });

        if (!likedRecruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        const user = await User.findById(user_id);

        console.log(likedRecruitment.like.indexOf(user._id));
        if (likedRecruitment.like.includes(user._id)) {
            const errorMessage = '이미 좋아요를 누른 게시물입니다.';
            throw new Error(errorMessage);
        }

        const newLikeValue = { $push: { like: user } };

        likedRecruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            newLikeValue
        );

        return likedRecruitment;
    }

    static async unlikeRecruitment({ recruitmentId, user_id }) {
        let unlikedRecruitment = await Recruitment.findById({ recruitmentId });

        if (!unlikedRecruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        const user = await User.findById(user_id);

        console.log(unlikedRecruitment.like.indexOf(user._id));
        const unlikedIndex = unlikedRecruitment.like.indexOf(user._id);
        if (unlikedIndex === -1) {
            const errorMessage = '좋아요를 누르지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }

        const like = unlikedRecruitment.like;
        like.splice(unlikedIndex, 1);
        const newUnlikeValue = { like };

        unlikedRecruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            newUnlikeValue
        );

        return unlikedRecruitment;
    }

    static async setMember({ recruitmentId, applicantId, user_id }) {
        let recruitment = await Recruitment.findById({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        if (recruitment.captain.id !== user_id) {
            const errorMessage = '권한이 없는 사용자입니다.';
            throw new Error(errorMessage);
        }

        const applyUser = await User.findById(applicantId);
        if (!applyUser) {
            const errorMessage = '존재하지 않는 사용자입니다.';
            throw new Error(errorMessage);
        }

        const applyUserIndex = recruitment.applicant.indexOf(applyUser._id);

        if (applyUserIndex === -1) {
            const errorMessage = '지원하지 않은 사용자입니다.';
            throw new Error(errorMessage);
        }

        const applicant = recruitment.applicant;
        applicant.splice(applyUserIndex, 1);
        const newApplicantValue = { applicant };

        recruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            newApplicantValue
        );

        const newMemberValue = { $push: { member: applicant } };

        recruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            newMemberValue
        );

        return recruitment;
    }

    // 게시글 생성
    static async addRecruitment({ user_id, title, detail }) {
        const id = uuidv4();
        // title이나 detail 검증필요?
        const captain = await User.findById(user_id);
        const newRecruitment = { id, captain, title, detail };

        const createdNewRecruitment = await Recruitment.create(newRecruitment);

        return createdNewRecruitment;
    }

    // 모집마감
    static async closeRecruitment({ recruitmentId, userId }) {
        const recruitment = await Recruitment.findById({
            recruitmentId
        });
        const nowEnrolling = recruitment.nowEnrolling;
        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }

        if (userId !== recruitment.captain.id) {
            const errorMessage = '권한이 없습니다.';
            throw new Error(errorMessage);
        }

        const updatedRecruitment = await Recruitment.close({
            recruitmentId,
            nowEnrolling
        });
        return updatedRecruitment;
    }

    // 지원하기
    static async addApplicant({ recruitmentId, applicantId }) {
        const recruitment = await Recruitment.findApplicant({ recruitmentId });
        const applicant = await User.findById(applicantId);
        let applicantList = recruitment.applicant;
        const AppliedOrNot = recruitment.applicant.indexOf(applicant.id);
        // console.log(AppliedOrNot);

        // 게시글이 있는지 확인
        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }
        // 모집중인지 확인
        if (!recruitment.nowEnrolling) {
            const errorMessage = '해당 공고는 마감되었습니다.';
            throw new Error(errorMessage);
        }

        //지원자가 기존 지원자목록에 있는지 확인
        if (AppliedOrNot !== -1) {
            const errorMessage = '이미 지원하셨습니다.';
            throw new Error(errorMessage);
        }

        applicantList.push(applicant);
        // console.log(applicantList);

        const updatedRecruitment = await Recruitment.addApplicant({
            recruitmentId,
            applicantList
        });

        return updatedRecruitment;
    }

    //지원 취소하기
    static async cancleApplicant({ recruitmentId, applicantId }) {
        const recruitment = await Recruitment.findApplicant({ recruitmentId });
        const applicant = await User.findById(applicantId);
        let applicantList = recruitment.applicant;
        const AppliedOrNot = applicantList.find((v) => v.id === applicant.id);

        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }

        if (!recruitment.nowEnrolling) {
            const errorMessage = '해당 공고는 마감되었습니다.';
            throw new Error(errorMessage);
        }

        if (AppliedOrNot.length === 0) {
            const errorMessage = '이미 취소했거나 지원하지 않은 공고입니다.';
            throw new Error(errorMessage);
        }

        applicantList = applicantList.find((v) => v.id !== applicant.id);
        const updatedRecruitment = await Recruitment.deleteApplicant({
            recruitmentId,
            applicantList
        });

        return updatedRecruitment;
    }

    static async addComment({ recruitmentId, content, user_id }) {
        if (content === null || content === undefined || content.length === 0) {
            const errorMessage = '빈칸 ㄴㄴ';
            throw new Error(errorMessage);
        }

        let recruitment = await Recruitment.findById({ recruitmentId });

        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        const id = uuidv4();

        const user = await User.findById(user_id);

        const newCommentValue = {
            $push: { comment: { id, author: user, content } }
        };

        recruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            newCommentValue
        );

        return recruitment;
    }

    static async deleteRecruitment({ recruitmentId, user_id }) {
        const recruitment = await Recruitment.findById({ recruitmentId });

        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        if (recruitment._doc.captain.id !== user_id) {
            const errorMessage = '삭제할 수 없습니다.';
            throw new Error(errorMesaage);
        }

        await Recruitment.deleteById({ recruitmentId });
        return;
    }

    // 댓글 수정하기
    static async setComment({ recruitmentId, authorId, toUpdate }) {
        const recruitment = await Recruitment.findAuthor({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }
        const author = await User.findById(authorId);
        console.log(recruitment);
        // captain이 댓글쓸 때 어떻게?
        if (authorId === recruitment.captain.id) {
            console.log('[captain]! writing');
        }

        console.log(recruitment.comment[0].author);
        // 로그인한 유저와 댓글작성자가 다르면 에러메세지.
        if (
            recruitment.comment.length !== 0 &&
            authorId !== recruitment.comment.author.id
        ) {
            const errorMessage = '수정 권한이 없습니다.';
            throw new Error(errorMessage);
        }

        const updatedRecruitment = await Recruitment.updateComment({
            recruitmentId,
            author,
            toUpdate
        });
        return updatedRecruitment;
    }

    //댓글 삭제하기
    static async deleteComment({ recruitmentId, authorId }) {
        const recruitment = await Recruitment.findById({ recruitment });
        if (!recruitment) {
            const errorMessage = '삭제된 게시물입니다.';
            throw new Error(errorMessage);
        }
        console.log(recruitment.comment.author.id);
        if (recruitment.comment.author.id !== authorId) {
            const errorMessage = '권한이 없습니다.';
            throw new Error(errorMessage);
        }
        await Recruitment.deleteComment({ recruitmentId, authorId });
        return;
    }
}

export { RecruitmentService };
