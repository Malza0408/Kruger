import { Router } from 'express';
import axios from 'axios';
import { AuthService } from '../services/AuthService';

const authRouter = Router();

authRouter.get('/auth/kakao', async (req, res, next) => {
    try {
        const uri = 'https://kauth.kakao.com/oauth/token';
        const config = {
            code: req.query.code.slice(0, -1),
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

        const user = await AuthService.checkUser(userInfo);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

function base64urlDecode(str) {
    return new Buffer(base64urlUnescape(str), 'base64').toString();
}
function base64urlUnescape(str) {
    str += Array(5 - (str.length % 4)).join('=');
    return str.replace(/\-/g, '+').replace(/_/g, '/');
}
authRouter.get('/auth/google', async (req, res, next) => {
    try {
        const uri = 'https://oauth2.googleapis.com/token';
        const config = {
            code: req.query.code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/auth/google/callback'
        };
        const params = new URLSearchParams(config);
        const finalUrl = `${uri}?${params}&grant_type=authorization_code`;
        const tokenRequest = await axios.post(finalUrl, config);
        // console.log(tokenRequest);
        if (tokenRequest.status !== 200 || tokenRequest.statusText !== 'OK') {
            const errorMessage = 'google 인증 실패';
            throw new Error(errorMessage);
        }

        let idToken = tokenRequest.data.id_token;
        idToken = idToken.split('.');
        const header = JSON.parse(base64urlDecode(idToken[0]));
        const payload = JSON.parse(base64urlDecode(idToken[1]));

        const { sub, email, name } = payload;
        const userInfo = {
            id: sub,
            name,
            email,
            password: '',
            loginMethod: 'google'
        };
        const user = await AuthService.checkUser(userInfo);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// 깃허브
authRouter.get('/auth/github', async (req, res, next) => {
    try {
        const uri = 'https://github.com/login/oauth/access_token';
        const config = {
            code: req.query.code.slice(0, -1),
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

        // userData 가져오기
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
            name: 'Github user',
            email,
            password: '',
            description,
            loginMethod: 'github',
            repositoryUrl
        };
        // 깃허브로 로그인 or 회원가입
        const user = await AuthService.checkUser(userInfo);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

export { authRouter };
