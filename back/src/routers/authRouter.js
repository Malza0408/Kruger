import { Router } from 'express';
import passport from 'passport';
import { login_required } from '../middlewares/login_required';
import jwt from 'jsonwebtoken';

const authRouter = Router();
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

export { authRouter };
