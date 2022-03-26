import { User } from '../db';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class KakaoService {
    // 회원가입
    static async addUser(userInfo) {
        const user = await User.create(userInfo);
        console.log('github user sign in.');
        return user;
    }

    // 유저가 db에 있는지 확인
    static async checkUser(userInfo) {
        const email = userInfo.email;
        const id = userInfo.id;
        let user = await User.findByEmail({ email });

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
            } else {
                // id가 다르면 다른 방법으로 가입했으므로 loginMethod 넣어서 에러 발생시킴.
                const errorMessage = `${user.loginMethod} 로 로그인해주세요.`;
                throw new Error(errorMessage);
            }
        }

        // 이메일이 등록안됐으면 회원가입하는 유저.
        user = await this.addUser(userInfo);
    }

    // 토큰으로 유저데이터 받아오기
    static async getUserData(accessToken) {
        const userData = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        // userData에 error가 있으면 에러 발생
        if (userData.data.error) {
            const errorMessage = 'kakao 데이터 전송 실패';
            throw new Error(errorMessage);
        }

        // response에서 유저데이터 빼와서 정제
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

    // 토큰 받아오기
    static async getToken(code) {
        const uri = 'https://kauth.kakao.com/oauth/token';
        const config = {
            code,
            client_id: process.env.KAKAO_CLIENT_ID,
            redirect_uri: `${process.env.DEFAULT_URI}/auth/kakao/callback`,
            grant_type: 'authorization_code'
        };

        // config 형태 url에 맞게 변경
        const params = new URLSearchParams(config);
        const finalUrl = `${uri}?${params}`;

        // kakao에 요청보내기
        const tokenRequest = await axios.post(finalUrl, config);
        if (tokenRequest.status !== 200 || tokenRequest.statusText !== 'OK') {
            const errorMessage = 'kakao 인증 실패';
            throw new Error(errorMessage);
        }

        // response에서 token 꺼내기
        const accessToken = tokenRequest.data.access_token;
        return this.getUserData(accessToken);
    }
}
export { KakaoService };
