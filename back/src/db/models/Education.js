import { EducationModel } from '../schemas/education';
import { UserModel } from '../schemas/user';

class Education {
    static async create({ newEducation }) {
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
    static async update({ education_id, fieldToUpdate, newValue }) {
        const filter = { id: education_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedEducation;
    }
}

export { Education };
