import { UserModel } from '../schemas/user';

class User {
    static async createUser(newUser) {
        const createdUser = await UserModel.create(newUser);
        return createdUser;
    }
    static async findByEmail({ email }) {
        const foundUser = await UserModel.findOne({ email });
        return foundUser;
    }
}
export { User };
