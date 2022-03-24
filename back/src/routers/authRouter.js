import { Router } from 'express';
import passport from 'passport';
import { login_required } from '../middlewares/login_required';

// import fetch from 'node-fetch';
import axios from 'axios';
import { UserService } from '../services/UserService';
import { GoogleService } from '../services/GoogleService';
import { GithubService } from '../services/GithubService';

const authRouter = Router();
//구글
authRouter.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
authRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res, next) => {
        try {
            const user = req.user;
            console.log('google user signed in.');
            // console.log(req);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
);

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
            return res.redirect('/');
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
        let { id, name, email, login, avatar } = userData.data;
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
            name,
            email,
            password: '',
            description,
            loginMethod: 'github',
            repositoryUrl
        };
        // 깃허브로 로그인 or 회원가입
        const user = await GithubService.checkUser(userInfo);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

export { authRouter };
