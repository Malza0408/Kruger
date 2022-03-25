import { User } from '../db';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class KakaoService {
    static async getToken(code) {
        const uri = 'https://kauth.kakao.com/oauth/token';
        const config = {
            code,
            client_id: process.env.KAKAO_CLIENT_ID,
            redirect_uri: 'http://localhost:3000/auth/kakao/callback',
            grant_type: 'authorization_code'
        };
        const params = new URLSearchParams(config);
        const finalUrl = `${uri}?${params}`;
        const tokenRequest = await axios.post(finalUrl, config);
        if (tokenRequest.status !== 200 || tokenRequest.statusText !== 'OK') {
            const errorMessage = 'kakao 인증 실패';
            throw new Error(errorMessage);
        }
        const accessToken = tokenRequest.data.access_token;
        return this.getUserData(accessToken);
    }
    static async getUserData(accessToken) {
        const userData = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (userData.data.error) {
            const errorMessage = 'kakao 데이터 전송 실패';
            throw new Error(errorMessage);
        }

        const id = String(userData.data.id);
        const { nickname, profile_image, thumbnail_image } =
            userData.data.properties;
        const email = userData.data.kakao_account.email;
        const userInfo = {
            id,
            name: nickname,
            email,
            password: '',
            loginMethod: 'kakao',
            picture: profile_image
        };
        return this.checkUser(userInfo);
    }
    static async addUser(userInfo) {
        const user = await User.create(userInfo);
        console.log('github user sign in.');
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
                console.log('github user log in.');
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
export { KakaoService };
