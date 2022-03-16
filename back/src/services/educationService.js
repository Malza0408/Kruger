import { Education } from '../db';
import { User } from '../db';
import { v4 as uuidv4 } from 'uuid';

class educationAuthService {
    static async addEducation({ user_id, school, major, position }) {
        const id = uuidv4();
        console.log(id);

        const newEducation = { id, user_id, school, major, position };
        console.log('newEducation', newEducation);
        const createdEducation = await Education.create({ newEducation });
        createdEducation.errorMessage = null;
        return createdEducation;
    }
    static async getEducation({ education_id }) {
        const education = await Education.getEducation({ education_id });
        education.errorMessage = null;
        return education;
    }
    static async edit({ education_id, toUpdate }) {
        let education = await Education.getEducation({ education_id });
        if (!education) {
            education.errorMessage =
                '등록된 학력이 없습니다. 다시 확인해주세요';
        }
        if (toUpdate.school) {
            const fieldToEdit = 'school';
            const newValue = toUpdate.school;
            education = await Education.edit({
                education_id,
                fieldToEdit,
                newValue
            });
        }
        if (toUpdate.major) {
            const fieldToEdit = 'major';
            const newValue = toUpdate.major;
            education = await Education.edit({
                education_id,
                fieldToEdit,
                newValue
            });
        }
        if (toUpdate.position) {
            const fieldToEdit = 'position';
            const newValue = toUpdate.position;
            education = await Education.edit({
                education_id,
                fieldToEdit,
                newValue
            });
        }
        return education;
    }
    static async getEducationList({ user_id }) {
        console.log({ user_id });
        const educationList = await Education.getEducations({ user_id });

        return educationList;
    }
}

export { educationAuthService };
