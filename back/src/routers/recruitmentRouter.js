import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { updateMiddleware } from '../middlewares/updateMiddleware';
import { RecruitmentService } from '../services/RecruitmentService';

const recruitmentRouter = Router();

recruitmentRouter.put(
    '/recruit/:id',
    login_required,
    updateMiddleware,
    async function (req, res, next) {
        try {
            const recruitment_id = req.params.id;
            const user_id = req.currentUserId;
            const toUpdate = req.toUpdate;

            const updatedRecruitment = await RecruitmentService.setRecruitment({
                recruitment_id,
                user_id,
                toUpdate
            });

            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

// 게시글 하나 보기, 로그인 안해도 볼수있게.
recruitmentRouter.get('/recruit/:id', async (req, res, next) => {
    const recruitmentId = req.params.id;
    const recruitment = await RecruitmentService.getRecruitment({
        recruitmentId
    });
    res.status(200).json(recruitment);
});

recruitmentRouter.post(
    '/recruit/create',
    login_required,
    async (req, res, next) => {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    'headers의 Content-Type을 application/json으로 설정해주세요'
                );
            }
            const { title, detail } = req.body;
            const user_id = req.currentUserId;
            console.log('여기', user_id, title, detail);
            const newRecruitment = await RecruitmentService.addRecruitment({
                user_id,
                title,
                detail
            });
            res.status(201).json(newRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

recruitmentRouter.patch(
    '/recruit/:id',
    login_required,
    async (req, res, next) => {
        try {
            const recruitmentId = req.params.id;
            const userId = req.currentUserId;
            const updatedRecruitment =
                await RecruitmentService.closeRecruitment({
                    recruitmentId,
                    userId
                });
            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

recruitmentRouter.patch(
    '/recruit/apply/:id',
    login_required,
    async (req, res, next) => {
        try {
            const recruitmentId = req.params.id;
            const applicantId = req.currentUserId;
            const updatedRecruitment = await RecruitmentService.addApplicant({
                recruitmentId,
                applicantId
            });
            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

recruitmentRouter.patch(
    '/recruit/comment/:id',
    login_required,
    async (req, res, next) => {
        const recruitmentId = req.params.id;
        const authorId = req.currentUserId;
    }
);

export { recruitmentRouter };
