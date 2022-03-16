import { EducationModel } from '../schemas/education';
import { UserModel } from '../schemas/user';

class Education {
    static async create({ newEducation }) {
        const createdEducation = await EducationModel.create(newEducation);
        return createdEducation;
    }
    static async getEducation({ education_id }) {
        // console.log(education_id);
        // console.log(typeof education_id);
        const education = await EducationModel.findOne({ id: education_id });
        return education;
    }
    static async edit({ education_id, fieldToEdit, newValue }) {
        const filter = { id: education_id };
        const value = { fieldToEdit: newValue };
        const option = { returnOriginal: false };
        const education = await EducationModel.findOneAndUpdate({
            filter,
            value,
            option
        });
        return education;
    }
    static async getEducations({ user_id }) {
        const educationList = await EducationModel.find({ user_id });
        console.log(educationList);
        return educationList;
    }
}

export { Education };
