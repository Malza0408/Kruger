import { Router } from 'express';
import { GithubService } from '../services/GithubService';
import { GoogleService } from '../services/GoogleService';
import { KakaoService } from '../services/KakaoService';

const authRouter = Router();

// 카카오
authRouter.get('/auth/kakao', async (req, res, next) => {
    try {
        const code = req.query.code.slice(0, -1);
        const user = await KakaoService.getToken(code);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// 구글
authRouter.get('/auth/google', async (req, res, next) => {
    try {
        const code = req.query.code;
        const user = await GoogleService.getToken(code);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// 깃허브
authRouter.get('/auth/github', async (req, res, next) => {
    try {
        const code = req.query.code.slice(0, -1);
        const user = await GithubService.getToken(code);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

export { authRouter };
