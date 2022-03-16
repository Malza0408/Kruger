import { EducationModel } from '../schemas/education';
import { UserModel } from '../schemas/user';

class Education {
    static async create({ newEducation }) {
        const createdEducation = await EducationModel.create({ newEducation });
        return createdEducation;
    }
}

export { Education };
