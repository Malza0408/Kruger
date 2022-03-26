import { UserModel } from '../schemas/user';

class User {
    // 회원가입
    static async create(newUser) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    // 모든 사용자 리스트를 가져옴
    static async findAll() {
        const users = await UserModel.find({});
        return users;
    }

    // id를 통해 해당 사용자 정보를 가져옴
    static async findById(id) {
        const user = await UserModel.findOne({ id })
            .populate('follow')
            .populate('follower');
        return user;
    }

    // 이메일을 통해 해당 사용자 정보를 가져옴
    static async findByEmail({ email }) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    // 로그인 방법(이메일, 소셜)을 통해 사용자 리스트를 가져옴
    static async findByLoginMethod({ loginMethod }) {
        const user = await UserModel.findOne({ loginMethod });
        return user;
    }

    // filter를 통해 특정한 사용자의 정보를 수정함
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

    // follow, follower의 정보를 수정함
    static async updateFollow(filter, newValue) {
        const option = { returnOriginal: false };
        const updatedUser = await UserModel.findOneAndUpdate(
            filter,
            newValue,
            option
        )
            .populate('follow')
            .populate('follower');
        return updatedUser;
    }

    // id를 통해 해당 사용자를 탈퇴시킴
    static async deleteById({ user_id }) {
        await UserModel.deleteOne({ id: user_id });
        return;
    }
}

export { User };
