import { User } from '../db';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class GithubService {
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
    static async getUserData(accessToken) {
        const userData = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: 'application/json'
            }
        });

        // userData에 error가 있으면 에러 발생
        if (userData.data.error) {
            const errorMessage = 'github 데이터 전송 실패';
            throw new Error(errorMessage);
        }

        // 깃허브에서 데이터 가져와서 userInfo 객체로 만들기
        let { id, name, email, login } = userData.data;
        const repositoryUrl = `https://github.com/${login}`;
        const description = userData.data.bio;
        if (!email) {
            const emailData = await axios.get(
                'https://api.github.com/user/emails',
                {
                    headers: {
                        Authorization: `token ${accessToken}`,
                        Accept: 'application/json'
                    }
                }
            );

            email = emailData.data[0].email;
        }
        id = String(id);

        const userInfo = {
            id,
            name: name ?? 'Github user',
            email,
            password: '',
            description,
            loginMethod: 'github',
            repositoryUrl
        };
        return this.checkUser(userInfo);
    }

    // 토큰 받아오기
    static async getToken(code) {
        const uri = 'https://github.com/login/oauth/access_token';
        const config = {
            code,
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET
        };

        // config 형태 url에 맞게 변경
        const params = new URLSearchParams(config).toString();
        const finalUrl = `${uri}?${params}`;

        // 깃허브에 요청보내기
        const tokenRequest = await axios.post(finalUrl, config, {
            headers: {
                Accept: 'application/json'
            }
        });

        if (tokenRequest.data.error) {
            const errorMessage = 'github 인증 실패';
            throw new Error(errorMessage);
        }

        // response에서 token 꺼내기
        const accessToken = tokenRequest.data.access_token;
        return this.getUserData(accessToken);
    }
}
export { GithubService };
