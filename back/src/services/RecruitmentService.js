import { Recruitment, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class RecruitmentService {
    static async setRecruitment({ recruitment_id, user_id, toUpdate }) {
        let recruitment = await Recruitment.findById({ recruitment_id });

        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }

        if (recruitment.captain.id !== user_id) {
            const errorMessage = '수정할 수 없습니다.';
            throw new Error(errorMessage);
        }

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
            const errorMessage = '삭제되없거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }

        const user = await User.findbyId(user_id);

        console.log(likedRecruitment.like.indexOf(user._id));
        if (likedRecruitment.like.indexOf(user._id) !== -1) {
            const errorMessage = '이미 좋아요를 누른 게시물입니다.';
            throw new Error(errorMessage);
        }

        const newLikeValue = { $push: { like: user } };

        likedRecruitment = await Recruitment.updateLike(
            { id: recruitmentId },
            newLikeValue
        );

        return likedRecruitment;
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
