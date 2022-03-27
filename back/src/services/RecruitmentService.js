import { Recruitment, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class RecruitmentService {
    // 게시글 생성
    static async addRecruitment({ user_id, title, detail, language }) {
        const id = uuidv4();
        const captain = await User.findById(user_id);
        const newRecruitment = { id, captain, title, detail, language };

        const createdNewRecruitment = await Recruitment.create(newRecruitment);

        // 불필요한 데이터 정제하고 리턴
        const { password, follow, follower, ...refinedUser } =
            createdNewRecruitment.captain._doc;
        createdNewRecruitment.captain._doc = refinedUser;

        return createdNewRecruitment;
    }

    // 게시물 1개보기
    static async getRecruitment({ recruitmentId }) {
        // 게시물이 존재하는지 확인
        const recruitment = await Recruitment.findById({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }

        // 게시글에 populate 된 유저정보에서 id, name 만 리턴
        const { id, name, ...refinedUser } = recruitment.captain._doc;
        recruitment.captain._doc = { id, name };

        recruitment.applicant.map((v) => {
            const { id, name, ...refinedUser } = v._doc;
            v._doc = { id, name };
        });

        recruitment.member.map((v) => {
            const { name, ...refinedUser } = v._doc;
            v._doc = { name };
        });

        return recruitment;
    }

    // 게시물 수정하기
    static async setRecruitment({ recruitmentId, user_id, toUpdate }) {
        // 게시물이 존재하는지 확인
        let recruitment = await Recruitment.findById({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 게시물 작성자인지 확인
        if (recruitment._doc.captain.id !== user_id) {
            const errorMessage = '수정할 수 없습니다.';
            throw new Error(errorMessage);
        }

        // 게시물 수정
        const keys = Object.keys(toUpdate);
        const values = Object.values(toUpdate);

        for (let i = 0; i < keys.length; i++) {
            recruitment = await Recruitment.update(
                recruitmentId,
                keys[i],
                values[i]
            );
        }

        return recruitment;
    }

    // 게시글 목록보기
    static async getRecruitments() {
        const recruitments = await Recruitment.findAll();
        return recruitments;
    }

    // 모집마감 토글
    static async closeRecruitment({ recruitmentId, userId }) {
        // 게시물이 존재하는지 확인
        const recruitment = await Recruitment.findById({
            recruitmentId
        });
        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 게시글 작성자인지 확인
        if (userId !== recruitment.captain.id) {
            const errorMessage = '권한이 없습니다.';
            throw new Error(errorMessage);
        }

        // 모집중 <-> 모집마감 토글
        let nowEnrolling = recruitment.nowEnrolling;
        const updatedRecruitment = await Recruitment.toggle({
            recruitmentId,
            nowEnrolling
        });
        nowEnrolling = updatedRecruitment.nowEnrolling;
        let message = '';
        if (nowEnrolling) {
            message = '모집중입니다.';
        } else {
            message = '모집마감했습니다.';
        }

        return { nowEnrolling, message };
    }

    // 지원하기
    static async addApplicant({ recruitmentId, applicantId }) {
        const applicant = await User.findById(applicantId);
        const recruitment = await Recruitment.findById({
            recruitmentId
        });

        const applicants = recruitment.applicant.find(
            (v) => v.id === applicant.id
        );

        // 게시물이 존재하는지 확인
        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }
        // 모집중인지 확인
        if (!recruitment.nowEnrolling) {
            const errorMessage = '해당 공고는 마감되었습니다.';
            throw new Error(errorMessage);
        }
        // 유저가 기존 지원자목록에 있는지 확인
        if (applicants) {
            const errorMessage = '이미 지원하셨습니다.';
            throw new Error(errorMessage);
        }

        const updatedRecruitment = await Recruitment.addApplicant({
            recruitmentId,
            applicant
        });

        updatedRecruitment.applicant.map((v) => {
            const { password, ...refinedUser } = v._doc;
            v._doc = refinedUser;
        });

        return updatedRecruitment;
    }

    //지원 취소하기
    static async cancleApplicant({ recruitmentId, applicantId }) {
        let applicant = await User.findById(applicantId);
        const recruitment = await Recruitment.findById({
            recruitmentId
        });

        const applicantValidator = [];
        for (const user of recruitment.applicant) {
            if (user.id === applicantId) {
                applicantValidator.push(true);
            } else {
                applicantValidator.push(false);
            }
        }

        const appliedOrNot = applicantValidator.indexOf(true);

        // 게시물이 존재하는지 확인
        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }
        // 모집중인지 확인
        if (!recruitment.nowEnrolling) {
            const errorMessage = '해당 공고는 마감되었습니다.';
            throw new Error(errorMessage);
        }
        // 유저가 기존 지원자목록에 있는지 확인
        if (appliedOrNot === -1) {
            const errorMessage =
                '지원하지 않으셨거나 이미 지원 취소하셨습니다.';
            throw new Error(errorMessage);
        }

        applicant = recruitment.applicant;
        applicant.splice(appliedOrNot, 1);

        const updatedRecruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            { applicant }
        );

        return updatedRecruitment;
    }

    // 멤버 승인하기
    static async setMember({ recruitmentId, applicantId, user_id }) {
        // 게시물이 존재하는지 확인
        let recruitment = await Recruitment.findById({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 게시물 작성자인지 확인
        if (recruitment.captain.id !== user_id) {
            const errorMessage = '권한이 없는 사용자입니다.';
            throw new Error(errorMessage);
        }

        // 승인할 지원자가 지원자 목록에 있는지 확인
        const applyUser = await User.findById(applicantId);
        if (!applyUser) {
            const errorMessage = '존재하지 않는 사용자입니다.';
            throw new Error(errorMessage);
        }

        // 지원자 목록에서 멤버 승인하기
        const applicantValidator = [];
        for (const user of recruitment.applicant) {
            if (user.id === applicantId) {
                applicantValidator.push(true);
            } else {
                applicantValidator.push(false);
            }
        }

        const applyUserIndex = applicantValidator.indexOf(true);

        if (!applicantValidator.includes(true)) {
            const errorMessage = '지원하지 않은 사용자입니다.';
            throw new Error(errorMessage);
        }

        const memberValidator = [];
        for (const user of recruitment.member) {
            if (user.id === applicantId) {
                memberValidator.push(true);
            } else {
                memberValidator.push(false);
            }
        }

        const isMemberIndex = memberValidator.indexOf(true);

        if (isMemberIndex !== -1) {
            const errorMessage = '이미 멤버입니다.';
            throw new Error(errorMessage);
        }

        const applicant = recruitment.applicant;
        applicant.splice(applyUserIndex, 1);
        const newApplicantValue = { applicant };

        recruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            newApplicantValue
        );

        const newMemberValue = { $push: { member: applyUser } };

        recruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            newMemberValue
        );

        return recruitment;
    }

    // 게시물에 좋아요 누르기
    static async likeRecruitment({ recruitmentId, user_id }) {
        // 게시물이 존재하는지 확인
        let recruitment = await Recruitment.findById({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        const user = await User.findById(user_id);
        const likedIndex = recruitment.like.indexOf(user._id);

        // 유저가 like 리스트에 없으면 추가
        if (likedIndex === -1) {
            const newLikeValue = { $push: { like: user } };
            recruitment = await Recruitment.updateArray(
                { id: recruitmentId },
                newLikeValue
            );
        } else {
            // 유저가 like 리스트에 있으면 삭제
            const like = recruitment.like;
            like.splice(likedIndex, 1);
            const newLikeValue = { like };

            recruitment = await Recruitment.updateArray(
                { id: recruitmentId },
                newLikeValue
            );
        }

        return recruitment;
    }

    // 댓글 추가하기
    static async addComment({ recruitmentId, content, user_id }) {
        // 내용이 있는지 확인
        if (content === null || content === undefined || content.length === 0) {
            const errorMessage = '내용을 입력해주세요.';
            throw new Error(errorMessage);
        }

        // 게시물이 존재하는지 확인
        let recruitment = await Recruitment.findById({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        // 댓글 생성
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

    // 댓글 수정하기
    static async setComment({ recruitmentId, commentId, authorId, toUpdate }) {
        // 게시물이 존재하는지 확인
        const recruitment = await Recruitment.findAuthor({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        // comment 존재하는지 확인
        let comments = recruitment.comment.find(
            (comment) => comment.id === commentId
        );
        if (
            comments === null ||
            comments === undefined ||
            comments.length === 0
        ) {
            const errorMessage = '없는 댓글입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 댓글 작성자인지 확인
        if (comments.author.id !== authorId) {
            const errorMessage = '권한이 없는 사용자입니다.';
            throw new Error(errorMessage);
        }

        // 댓글 수정
        comments.content = Object.values(toUpdate)[0];
        const comment = recruitment.comment;
        const commentIndex = recruitment.comment.indexOf(comments);
        comment[commentIndex] = comments;
        const updatedRecruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            { comment }
        );

        return updatedRecruitment;
    }

    //댓글 삭제하기
    static async deleteComment({ recruitmentId, commentId, authorId }) {
        // 게시물이 존재하는지 확인
        const recruitment = await Recruitment.findAuthor({ recruitmentId });

        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        // comment 존재하는지 확인
        let comment = recruitment.comment.find(
            (comment) => comment.id === commentId
        );

        if (comment === null || comment === undefined || comment.length === 0) {
            const errorMessage = '없는 댓글입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 댓글 작성자인지 확인
        if (comment.author.id !== authorId) {
            const errorMessage = '권한이 없는 사용자입니다.';
            throw new Error(errorMessage);
        }
        // 댓글 삭제
        const updatedRecruitment = await Recruitment.updateArray(
            { id: recruitmentId },
            { $pull: { comment: { id: commentId } } }
        );

        return updatedRecruitment;
    }

    // 게시물 삭제하기
    static async deleteRecruitment({ recruitmentId, user_id }) {
        // 게시물이 존재하는지 확인
        const recruitment = await Recruitment.findById({ recruitmentId });

        if (!recruitment) {
            const errorMessage = '존재하지 않는 게시물입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 게시물 작성자인지 확인
        if (recruitment._doc.captain.id !== user_id) {
            const errorMessage = '권한이 없는 사용자입니다.';
            throw new Error(errorMessage);
        }

        // 게시물 삭제
        await Recruitment.deleteById({ recruitmentId });
        return;
    }
}

export { RecruitmentService };
