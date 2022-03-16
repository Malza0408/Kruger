import { Award } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class awardAuthService {
    static async addAward({ user_id, title, description }) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newAward = { id, user_id, title, description };

        console.log(newAward);

        // db에 저장
        const createdNewAward = await Award.create({ newAward });
        createdNewAward.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

        return createdNewAward;
    }

    static async getAwardInfo({ award_id }) {
        const award = await Award.findById({ award_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!award) {
            const errorMessage = '삭제되었거나 등록되지 않은 수상내역입니다.';
            return { errorMessage };
        }

        return award;
    }

    static async setAward({ award_id, toUpdate }) {
        // 우선 해당 id 의 수상내역이 db에 존재하는지 여부 확인
        let award = await Award.findById({ award_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!award) {
            const errorMessage = '삭제되었거나 등록되지 않은 수상 내역입니다.';
            return { errorMessage };
        }

        // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.title) {
            const fieldToUpdate = 'title';
            const newValue = toUpdate.title;
            award = await Award.update({ award_id, fieldToUpdate, newValue });
        }

        if (toUpdate.description) {
            const fieldToUpdate = 'description';
            const newValue = toUpdate.description;
            award = await Award.update({ award_id, fieldToUpdate, newValue });
        }

        return award;
    }

    static async getAwards({ user_id }) {
        const awards = await Award.findAllById({ user_id });
        return awards;
    }
}

export { awardAuthService };
