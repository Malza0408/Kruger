import { User } from '../db';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class GoogleService {
    // jwt 디코딩
    static base64urlDecode(str) {
        return Buffer.from(this.base64urlUnescape(str), 'base64').toString();
    }

    // jwt 디코딩
    static base64urlUnescape(str) {
        str += Array(5 - (str.length % 4)).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    }

    // 회원가입
    static async addUser(userInfo) {
        const user = await User.create(userInfo);
        console.log('user sign in.');
        return user;
    }

    // 유저가 db에 있는지 확인
    static async checkUser(userInfo) {
        const email = userInfo.email;
        const id = userInfo.id;
        let user = await User.findByEmail({ email });
        const loginMethod = userInfo.loginMethod;

        // 이메일이 같은 유저가 db에 있는지 확인
        if (user) {
            if (user.id === id) {
                // id가 같으면 기존 회원이므로 토큰발급해서 로그인 시킴.
                const secretKey =
                    process.env.JWT_SECRET_KEY || 'jwt-secret-key';
                const token = jwt.sign({ user_id: id }, secretKey);

                // 비밀번호 제외하고 리턴
                const { password, ...refinedUser } = user._doc;
                user._doc = { ...refinedUser, token };
                console.log('user log in.');
                return user;
            } else if (user.loginMethod !== loginMethod) {
                // id가 다르면 다른 방법으로 가입했으므로 loginMethod 넣어서 에러 발생시킴.
                const errorMessage = `${user.loginMethod} 로 로그인해주세요.`;
                throw new Error(errorMessage);
            }
        }

        // 이메일이 등록안됐으면 회원가입하는 유저.
        user = await this.addUser(userInfo);
    }

    // 토큰으로 유저데이터 받아오기
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

    // 토큰 받아오기
    static async getToken(code) {
        const uri = 'https://oauth2.googleapis.com/token';
        const config = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `${process.env.DEFAULT_URI}/auth/google/callback`
        };

        // config 형태 url에 맞게 변경
        const params = new URLSearchParams(config);
        const finalUrl = `${uri}?${params}&grant_type=authorization_code`;

        // 구글에 요청보내기
        const tokenRequest = await axios.post(finalUrl, config);

        // 에러있으면 에러 발생
        if (tokenRequest.status !== 200 || tokenRequest.statusText !== 'OK') {
            const errorMessage = 'google 인증 실패';
            throw new Error(errorMessage);
        }

        // response에서 id token(jwt) 꺼내기
        let idToken = tokenRequest.data.id_token;
        idToken = idToken.split('.');
        const payload = JSON.parse(this.base64urlDecode(idToken[1]));
        return this.getUserData(payload);
    }
}

export { GoogleService };
