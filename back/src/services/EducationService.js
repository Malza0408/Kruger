import { Education } from '../db';
import { User } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { EducationModel } from '../db/schemas/education';

class EducationService {
    static async addEducation({ user_id, school, major, position }) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newEducation = { id, user_id, school, major, position };

        // db에 저장
        const createdNewEducation = await Education.create({ newEducation });

        return createdNewEducation;
    }

    static async getEducations({ user_id }) {
        const educations = await Education.findAll({ user_id });
        return educations;
    }

    static async getEducationInfo({ education_id }) {
        const education = await Education.findById({ education_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!education) {
            const errorMessage = '삭제되었거나 등록되지 않은 학력입니다.';
            throw new Error(errorMessage);
        }
        return education;
    }

    static async setEducation({ education_id, user_id, toUpdate }) {
        let education = await Education.findById({ education_id });

        if (!education) {
            const errorMessage = '삭제되었거나 등록되지 않은 학력입니다.';
            throw new Error(errorMessage);
        }

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
    static async deleteEducation({ education_id, user_id }) {
        const education = await Education.findById({
            education_id
        });
        if (!education) {
            const errorMessage = '해당하는 학력이 없습니다. 다시 확인해주세요.';
            throw new Error(errorMessage);
        }
        if (education.user_id !== user_id) {
            const errorMessage = '삭제할 수 없습니다.';
            throw new Error(errorMessage);
        }
        await Education.deleteById({ education_id });
        return;
    }
}

export { EducationService };
