import { User } from '../db';
import jwt from 'jsonwebtoken';

class GithubService {
    static async addGithubUser(userInfo) {
        const user = await User.create(userInfo);
        console.log('github user sign in.');
        return user;
    }

    static async checkUser(userInfo) {
        const email = userInfo.email;
        const id = userInfo.id;
        let user = await User.findByEmail({ email });
        const loginMethod = userInfo.loginMethod;
        // 깃허브 인증은 거쳤으니까 이미 이메일이 등록된 유저라면 깃허브로 회원가입한 유저.
        // 토큰발급해서 로그인 시킴.
        if (user && user.loginMethod === loginMethod) {
            const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
            const token = jwt.sign({ user_id: id }, secretKey);

            const loginUserKeys = Object.keys(user._doc);

            const { password, ...refinedUser } = user._doc;
            user._doc = { ...refinedUser, token };
            console.log('github user log in.');
            user._doc.token = token;

            return user;
        }

        // 이메일이 등록안됐으면 처음 깃허브로 회원가입하는 유저.
        user = await this.addGithubUser(userInfo);
    }
}
export { GithubService };
