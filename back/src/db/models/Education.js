import { EducationModel } from '../schemas/education';
import { UserModel } from '../schemas/user';

class Education {
    static async create({ newEducation }) {
        console.log(newEducation);
        let createdNewEducation = await EducationModel.create(newEducation);
        return createdNewEducation;
    }

    static async findByEducationId({ education_id }) {
        const education = await EducationModel.findOne({ id: education_id });
        return education;
    }

    static async findAll() {
        const educationList = await EducationModel.find({});
        return educationList;
    }
}

export { Education };
