import { User } from '../db';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class GoogleService {
    static base64urlDecode(str) {
        return Buffer.from(this.base64urlUnescape(str), 'base64').toString();
    }
    static base64urlUnescape(str) {
        str += Array(5 - (str.length % 4)).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    }
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
    static async getToken(code) {
        const uri = 'https://oauth2.googleapis.com/token';
        const config = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/auth/google/callback'
        };
        const params = new URLSearchParams(config);
        const finalUrl = `${uri}?${params}&grant_type=authorization_code`;
        const tokenRequest = await axios.post(finalUrl, config);

        if (tokenRequest.status !== 200 || tokenRequest.statusText !== 'OK') {
            const errorMessage = 'google 인증 실패';
            throw new Error(errorMessage);
        }

        let idToken = tokenRequest.data.id_token;
        idToken = idToken.split('.');
        // const header = JSON.parse(base64urlDecode(idToken[0]));
        const payload = JSON.parse(this.base64urlDecode(idToken[1]));
        return this.getUserData(payload);
    }
    static async getUserData(payload) {
        const { sub, email, name } = payload;
        const userInfo = {
            id: sub,
            name,
            email,
            password: '',
            loginMethod: 'google'
        };
        return this.checkUser(userInfo);
    }
}

export { GoogleService };
