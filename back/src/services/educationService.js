import { Education } from '../db';
import { User } from '../db';
import { v4 as uuidv4 } from 'uuid';

class educationService {
    static async createEducation({ user_id, school, major, position }) {
        // const education = await Education.findByUserId({ user_id })
        // console.log(education)
        // console.log('service data 받음.')
        // if (education){
        //     const errorMessage = '이미 학력이 등록 된 상태입니다.'
        //     return { errorMessage }
        // }
        // const user = user
        const id = uuidv4();
        // const user = await User.findById(user_id)
        // console.log(user._id)
        const newEducation = { id, user_id, school, major, position };
        const createdNewEducation = await Education.create({ newEducation });
        createdNewEducation.errorMessage = null;

        return createdNewEducation;
    }
    static async getEducation({ education_id }) {
        const education = await Education.findByEducationId({ education_id });
        console.log(education);
        if (!education) {
            const errorMessage =
                '해당하는 학력이 없습니다. 다시 한 번 확인해 주세요.';
            return { errorMessage };
        }
        return education;
    }
    static async getEducations() {
        const educationList = await Education.findAll();
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

export { educationService };
