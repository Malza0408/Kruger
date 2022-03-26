import { Award } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class AwardService {
    // 수상내역 생성
    static async addAward({ user_id, title, description }) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newAward = { id, user_id, title, description };

        // db에 저장
        const createdNewAward = await Award.create({ newAward });

        return createdNewAward;
    }

    // 수상내역 목록 보기
    static async getAwards({ user_id }) {
        const awards = await Award.findAll({ user_id });
        return awards;
    }

    // 수상내역 1개 보기
    static async getAwardInfo({ award_id }) {
        // 해당 id의 수상내역이 db에 존재하는지 확인
        const award = await Award.findById({ award_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!award) {
            const errorMessage = '삭제되었거나 등록되지 않은 수상내역입니다.';
            throw new Error(errorMessage);
        }

        return award;
    }

    // 수상내역 수정하기
    static async setAward({ award_id, user_id, toUpdate }) {
        // 해당 id의 프로젝트가 db에 존재하는지 확인
        let award = await Award.findById({ award_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!award) {
            const errorMessage = '삭제되었거나 등록되지 않은 수상 내역입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 수상내역 생성자인지 확인
        if (award.user_id !== user_id) {
            const errorMessage = '수정할 수 없습니다.';
            throw new Error(errorMessage);
        }

        const keys = Object.keys(toUpdate);
        const values = Object.values(toUpdate);

        for (let i = 0; i < keys.length; i++) {
            award = await Award.update(award_id, keys[i], values[i]);
        }

        return award;
    }

    static async deleteAward({ award_id, user_id }) {
        // 해당 id의 프로젝트가 db에 존재하는지 확인
        const award = await Award.findById({ award_id });

        if (!award) {
            const errorMessage = '삭제되었거나 등록되지 않은 수상 내역입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 프로젝트 생성자인지 확인
        if (award.user_id !== user_id) {
            const errorMessage = '삭제할 수 없습니다.';
            throw new Error(errorMessage);
        }

        await Award.deleteById({ award_id });
        return;
    }
}

export { AwardService };
