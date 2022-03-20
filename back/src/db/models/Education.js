import { EducationModel } from '../schemas/education';

class Education {
    static async create({ newEducation }) {
        let createdNewEducation = await EducationModel.create(newEducation);
        return createdNewEducation;
    }

    static async findByEducationId({ education_id }) {
        const education = await EducationModel.findOne({ id: education_id });
        return education;
    }

    static async findAll({ user_id }) {
        const educationList = await EducationModel.find({ user_id });
        return educationList;
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
    static async delete({ education_id }) {
        await EducationModel.deleteOne({ id: education_id });
        return;
    }
}

export { Education };
