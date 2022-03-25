import { User } from '../db';
import jwt from 'jsonwebtoken';

class AuthService {
    static async addUser(userInfo) {
        const user = await User.create(userInfo);
        console.log('user sign in.');
        return user;
    }
    static async checkUser(userInfo) {
        const email = userInfo.email;
        const id = userInfo.id;
        let user = await User.findByEmail({ email });
        const loginMethod = userInfo.loginMethod;
        if (user) {
            if (user.id === id) {
                // 토큰발급해서 로그인 시킴.
                const secretKey =
                    process.env.JWT_SECRET_KEY || 'jwt-secret-key';
                const token = jwt.sign({ user_id: id }, secretKey);
                const { password, ...refinedUser } = user._doc;
                user._doc = { ...refinedUser, token };
                console.log('user log in.');
                return user;
            } else if (user.loginMethod !== loginMethod) {
                // 에러 발생시킴. loginMethod 보내줌.
                const errorMessage = `${user.loginMethod} 로 로그인해주세요.`;
                throw new Error(errorMessage);
            }
        }

        // 이메일이 등록안됐으면 처음 깃허브로 회원가입하는 유저.
        user = await this.addUser(userInfo);
    }
}

export { AuthService };
