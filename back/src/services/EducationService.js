import { Education } from '../db';
import { User } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { EducationModel } from '../db/schemas/education';

class EducationService {
    // 학력 생성
    static async addEducation({ user_id, school, major, position }) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newEducation = { id, user_id, school, major, position };

        // db에 저장
        const createdNewEducation = await Education.create({ newEducation });

        return createdNewEducation;
    }

    // 학력 목록 보기
    static async getEducations({ user_id }) {
        const educations = await Education.findAll({ user_id });
        return educations;
    }

    // 학력 1개 보기
    static async getEducationInfo({ education_id }) {
        const education = await Education.findById({ education_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
            const errorMessage = '삭제되었거나 등록되지 않은 학력입니다.';
            throw new Error(errorMessage);
        }
        return education;
    }

    // 학력 수정하기
    static async setEducation({ education_id, user_id, toUpdate }) {
        // 해당 id 의 학력이 db에 존재하는지 확인
        let education = await Education.findById({ education_id });

        if (!education) {
            const errorMessage = '삭제되었거나 등록되지 않은 학력입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 학력 생성자인지 확인
        if (education.user_id !== user_id) {
            const errorMessage = '수정할 수 없습니다.';
            throw new Error(errorMessage);
        }

        const keys = Object.keys(toUpdate);
        const values = Object.values(toUpdate);

        for (let i = 0; i < keys.length; i++) {
            education = await Education.update(
                education_id,
                keys[i],
                values[i]
            );
        }

        return education;
    }

    // 학력 삭제하기
    static async deleteEducation({ education_id, user_id }) {
        // 해당 id 의 학력이 db에 존재하는지 확인
        const education = await Education.findById({
            education_id
        });
        if (!education) {
            const errorMessage = '해당하는 학력이 없습니다. 다시 확인해주세요.';
            throw new Error(errorMessage);
        }

        // 유저가 학력 생성자인지 확인
        if (education.user_id !== user_id) {
            const errorMessage = '삭제할 수 없습니다.';
            throw new Error(errorMessage);
        }
        await Education.deleteById({ education_id });
        return;
    }
}

export { EducationService };
