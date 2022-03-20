import { Router } from 'express';
import passport from 'passport';
import { login_required } from '../middlewares/login_required';
import jwt from 'jsonwebtoken';
// import fetch from 'node-fetch';
import axios from 'axios';
import { UserService } from '../services/UserService';

const authRouter = Router();
//구글
authRouter.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
authRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    })

    // (req, res, next) => {
    //     console.log(req);
    //     const token = jwt.sign(req, process.env.JWT_SECRET_KEY);
    //     console.log(token);
    //     res.redirect('/');
    // }
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
            res.redirect('/user/login');
        }
        const accessToken = tokenRequest.data.access_token;
        const userData = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${accessToken}`,
                Accept: 'application/json'
            }
        });
        if (userData.data.error) {
            res.redirect('/user/login');
        }
        console.log(userData.data);
        const id = userData.data.id;
        const name = userData.data.name;
        const email = userData.data.email;
        const login = userData.data.login;
        const avatar = userData.data.avatar_url;
        const repositoryUrl = `https://github.com/${login}`;
        const bio = userData.data.bio;
        const userInfo = {
            id,
            name,
            email,
            password: '',
            description: bio,
            loginMethod: 'github',
            repositoryUrl
        };
        const newUser = await UserService.addGithubUser(userInfo);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});
export { authRouter };
