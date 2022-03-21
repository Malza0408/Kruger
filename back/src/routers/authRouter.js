import { Router } from 'express';
import passport from 'passport';
import { login_required } from '../middlewares/login_required';

// import fetch from 'node-fetch';
import axios from 'axios';
import { UserService } from '../services/UserService';
import { GoogleService } from '../services/GoogleService';

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
            res.status(201).send(user);
        } catch (error) {
            next(error);
        }
    }
);

// 깃허브
authRouter.get('/auth/github', async (req, res, next) => {
    try {
        const clientId = process.env.GITHUB_CLIENT_ID;
        const redirectUri = 'http://localhost:5000/auth/github/callback';
        const uri = 'https://github.com/login/oauth/authorize';
        res.redirect(
            `${uri}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`
        );
    } catch (error) {
        next(error);
    }
});

authRouter.get('/auth/github/callback', async (req, res, next) => {
    try {
        const uri = 'https://github.com/login/oauth/access_token';
        const config = {
            code: req.query.code,
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
        // console.log(userData.data);
        const { id, name, email, login, avatar } = userData.data;
        const repositoryUrl = `https://github.com/${login}`;
        const description = userData.data.bio;
        // 깃허브로 회원가입한 유저가 이미 있는지 email로 확인
        const user = await UserService.checkUser(email);
        // 유저가 있으면 깃허브로 로그인시키기
        if (user) {
            const userId = user.id;
            const token = await UserService.getGithubUser(userId);
            const refinedUser = {
                token,
                id: userId,
                email,
                name,
                description,
                repositoryUrl,
                errorMessage: null
            };
            console.log('github user logged in.');
            return res.status(200).send(refinedUser);
            console.log('여기로 넘어감?');
        }
        // 없으면 유저 회원가입시키기
        const userInfo = {
            id,
            name,
            email,
            password: '',
            description,
            loginMethod: 'github',
            repositoryUrl
        };
        const newUser = await UserService.addUser(userInfo);
        console.log('github user signed in.');
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});
export { authRouter };
