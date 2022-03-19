import { Router } from 'express';
import passport from 'passport';
import { login_required } from '../middlewares/login_required';
import jwt from 'jsonwebtoken';

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
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        };
        console.log(config);

        const params = new URLSearchParams(config).toString();
        console.log(params);
        const finalUrl = `${uri}?${params}`;
        console.log(finalUrl);
        const tokenRequest = await import('node-fetch')
            .then(({ default: fetch }) => {
                fetch(finalUrl, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json'
                    }
                });
            })
            .json();
        console.log(tokenRequest);
    } catch (error) {
        next(error);
    }
});
export { authRouter };
