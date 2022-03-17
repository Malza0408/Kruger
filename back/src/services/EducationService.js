import { Education } from '../db';
import { User } from '../db';
import { v4 as uuidv4 } from 'uuid';

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
            return { errorMessage };
        }
        return education;
    }
    static async getEducations({ user_id }) {
        const educationList = await Education.findAll({ user_id });
        return educationList;
    }
    static async setEducation({ education_id, toUpdate }) {
        let education = await Education.findByEducationId({ education_id });
        if (!education) {
            const errorMessage =
                '학력을 등록한 내역이 없습니다. 다시 한 번 확인해주세요.';
            return { errorMessage };
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
}

export { EducationService };
