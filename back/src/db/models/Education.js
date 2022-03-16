import { EducationModel } from '../schemas/education';
import { UserModel } from '../schemas/user';

class Education {
    static async create({ newEducation }) {
        const createdEducation = await EducationModel.create(newEducation);
        return createdEducation;
    }
    static async getEducation({ education_id }) {
        console.log(education_id);
        console.log(typeof education_id);
        const education = await EducationModel.findOne({ id: education_id });
        return education;
    }
}

export { Education };
