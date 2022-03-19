import { Router } from 'express';
import passport from 'passport';
import { login_required } from '../middlewares/login_required';
import jwt from 'jsonwebtoken';
// import fetch from 'node-fetch';
import axios from 'axios';

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
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = 'http://localhost:3001/auth/github/callback';
    const uri = 'https://github.com/login/oauth/authorize';
    res.redirect(
        `${uri}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`
    );
});

authRouter.get('/auth/github/callback', async (req, res, next) => {
    try {
        const uri = 'https://github.com/login/oauth/access_token';
        const config = {
            code: req.query.code,
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET
        };
        console.log(config);

        const params = new URLSearchParams(config).toString();
        console.log(params);
        const finalUrl = `${uri}?${params}`;
        console.log('실행 테스트', finalUrl);
        // const tokenRequest = await fetch(finalUrl, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json'
        //     }
        // });

        // console.log(tokenRequest.json());
        const token = await axios.post(finalUrl, config, {
            headers: {
                Accept: 'application/json'
            }
        });
        const response = token.data;
        console.log(response);
    } catch (error) {
        next(error);
    }
});
export { authRouter };
