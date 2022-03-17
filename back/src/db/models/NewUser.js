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
    static async getAllUsers() {
        const userList = await UserModel.find({});
        return userList;
    }
    static async findById({ user_id }) {
        const user = await UserModel.findOne({ id: user_id });
        return user;
    }
}
export { User };
