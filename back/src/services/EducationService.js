import { Education } from '../db';
import { User } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { EducationModel } from '../db/schemas/education';

class EducationService {
    static async createEducation({ user_id, school, major, position }) {
        const id = uuidv4();
        const newEducation = { id, user_id, school, major, position };

        const createdNewEducation = await Education.create({ newEducation });
        createdNewEducation.errorMessage = null;

        return createdNewEducation;
    }
    static async getEducation({ education_id }) {
        const education = await Education.findByEducationId({ education_id });

        if (!education) {
            const errorMessage =
                '해당하는 학력이 없습니다. 다시 한 번 확인해 주세요.';
            throw new Error(errorMessage);
        }
        return education;
    }
    static async getEducations({ user_id }) {
        const educationList = await Education.findAll({ user_id });
        return educationList;
    }
    static async setEducation({ education_id, toUpdate }) {
        let education = await Education.findByEducationId({ education_id });
        const keys = Object.keys(toUpdate);
        const values = Object.values(toUpdate);
        if (!education) {
            const errorMessage =
                '학력을 등록한 내역이 없습니다. 다시 한 번 확인해주세요.';
            throw new Error(errorMessage);
        }

        for (let i = 0; i < keys.length; i++) {
            education = await Education.update(
                education_id,
                keys[i],
                values[i]
            );
        }

        return education;
    }
    static async deleteEducation({ education_id }) {
        const targetEducatoin = await Education.findByEducationId({
            education_id
        });
        if (!targetEducatoin) {
            const errorMessage = '해당하는 학력이 없습니다. 다시 확인해주세요.';
            throw new Error(errorMessage);
        }
        await Education.delete({ education_id });
        return;
    }
}

export { EducationService };
