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

    static async addRecruitment({ user_id, title, detail }) {
        const id = uuidv4();
        // title이나 detail 검증필요?
        const captain = await User.findById(user_id);
        // console.log(captain);
        const newRecruitment = { id, captain, title, detail };
        const createdNewRecruitment = await Recruitment.create(newRecruitment);
        // console.log('createdNewRecruitment', createdNewRecruitment);

        return createdNewRecruitment;
    }

    static async closeRecruitment({}) {}
}

export { RecruitmentService };
