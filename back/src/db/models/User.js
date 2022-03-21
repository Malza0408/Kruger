import { UserModel } from '../schemas/user';

class User {
    static async create(newUser) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    static async findAll() {
        const users = await UserModel.find({});
        return users;
    }

    static async findById(id) {
        const user = await UserModel.findOne({ id });
        return user;
    }

    static async findByEmail({ email }) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    static async update(filter, key, value) {
        const update = { [key]: value };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }

    static async updateFollow(filter, newValue) {
        const option = { returnOriginal: false };
        const updatedUser = await UserModel.findOneAndUpdate(
            filter,
            newValue,
            option
        );
        return updatedUser;
    }

    static async deleteById({ user_id }) {
        await UserModel.deleteOne({ id: user_id });
        return;
    }
}

export { User };
