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

    static async setEducation({ education_id, toUpdate }) {
        let education = await Education.findById({ education_id });

        if (!education) {
            const errorMessage = '삭제되었거나 등록되지 않은 학력입니다.';
            throw new Error(errorMessage);
        }
        if (toUpdate.school) {
            const fieldToUpdate = 'school';
            const newValue = toUpdate.school;
            education = await Education.update({
                education_id,
                fieldToUpdate,
                newValue
            });
        }
        if (toUpdate.major) {
            const fieldToUpdate = 'major';
            const newValue = toUpdate.major;
            education = await Education.update({
                education_id,
                fieldToUpdate,
                newValue
            });
        }
        if (toUpdate.position) {
            const fieldToUpdate = 'position';
            const newValue = toUpdate.position;
            education = await Education.update({
                education_id,
                fieldToUpdate,
                newValue
            });
        }
        return education;
    }
    static async deleteEducation({ education_id }) {
        const education = await Education.findById({
            education_id
        });
        if (!education) {
            const errorMessage = '해당하는 학력이 없습니다. 다시 확인해주세요.';
            throw new Error(errorMessage);
        }
        await Education.deleteById({ education_id });
        return;
    }
}

export { EducationService };
