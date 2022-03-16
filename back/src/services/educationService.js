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
}

export { educationAuthService };
