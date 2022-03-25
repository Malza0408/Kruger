import { User } from '../db';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class GithubService {
    static async getToken(code) {
        const uri = 'https://github.com/login/oauth/access_token';
        const config = {
            code,
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET
        };
        const params = new URLSearchParams(config).toString();
        const finalUrl = `${uri}?${params}`;
        const tokenRequest = await axios.post(finalUrl, config, {
            headers: {
                Accept: 'application/json'
            }
        });

        if (tokenRequest.data.error) {
            const errorMessage = 'github 인증 실패';
            throw new Error(errorMessage);
        }
        const accessToken = tokenRequest.data.access_token;
        console.log('before getUserData');
        return this.getUserData(accessToken);
        console.log('after getUserData');
    }

    static async getUserData(accessToken) {
        const userData = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: 'application/json'
            }
        });

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
export { GithubService };
