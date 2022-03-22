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

    static async getRecruitment({ recruitmentId }) {
        const recruitment = await Recruitment.findById({ recruitmentId });
        if (!recruitment) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }
        return recruitment;
    }

    static async addRecruitment({ user_id, title, detail }) {
        const id = uuidv4();
        // title이나 detail 검증필요?
        const captain = await User.findById(user_id);
        const newRecruitment = { id, captain, title, detail };

        const createdNewRecruitment = await Recruitment.create(newRecruitment);

        return createdNewRecruitment;
    }
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

    static async addApplicant({ recruitmentId, applicantId }) {
        const recruitment = await Recruitment.findById({ recruitmentId });
        // 지원자가져오기
        const applicant = await User.findById(applicantId);
        // 기존 지원자목록서 지원자 찾아서 가져오기
        const applied = await Recruitment.findApplicant({ applicant });

        // 모집중인지 확인
        if (!recruitment.nowEnrolling) {
            const errorMessage = '해당 공고는 마감되었습니다.';
            throw new Error(errorMessage);
        }

        //지원자가 기존 지원자목록에 있는지 확인
        if (applied) {
            const errorMessage = '이미 지원하셨습니다.';
            throw new Error(errorMessage);
        }

        const updatedRecruitment = await Recruitment.addApplicant({
            recruitmentId,
            applicant
        });

        return updatedRecruitment;
    }
}

export { RecruitmentService };
