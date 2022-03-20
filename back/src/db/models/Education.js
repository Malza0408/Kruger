import { EducationModel } from '../schemas/education';
import { UserModel } from '../schemas/user';

class Education {
    static async create({ newEducation }) {
        const createdNewEducation = await EducationModel.create(newEducation);
        return createdNewEducation;
    }

    static async findById({ education_id }) {
        const education = await EducationModel.findOne({ id: education_id });
        return education;
    }

    static async findAll({ user_id }) {
        const educations = await EducationModel.find({ user_id });
        return educations;
    }
    static async update(education_id, key, value) {
        const filter = { id: education_id };
        const update = { [key]: value };
        const option = { returnOriginal: false };
        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedEducation;
    }
    static async deleteById({ education_id }) {
        await EducationModel.deleteOne({ id: education_id });
        return;
    }
}

export { Education };
