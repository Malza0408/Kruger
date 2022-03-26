import { EducationModel } from '../schemas/education';

class Education {
    // 새로운 학력 요소 작성, 학력과 관련된 내용 필요
    static async create({ newEducation }) {
        const createdNewEducation = await EducationModel.create(newEducation);
        return createdNewEducation;
    }

    // 같은 user_id를 가진 모든 학력 요소들을 불러옴
    static async findAll({ user_id }) {
        const educations = await EducationModel.find({ user_id });
        return educations;
    }

    // id를 통해 해당 학력 요소를 가져옴
    static async findById({ education_id }) {
        const education = await EducationModel.findOne({ id: education_id });
        return education;
    }

    // id를 통해 해당 학력 요소를 수정함
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

    // id를 통해 해당 학력 요소를 삭제함
    static async deleteById({ education_id }) {
        await EducationModel.deleteOne({ id: education_id });
        return;
    }
}

export { Education };
