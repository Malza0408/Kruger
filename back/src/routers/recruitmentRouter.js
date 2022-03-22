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
            const recruitmentId = req.params.id;
            const user_id = req.currentUserId;
            const toUpdate = req.toUpdate;

            const updatedRecruitment = await RecruitmentService.setRecruitment({
                recruitmentId,
                user_id,
                toUpdate
            });

            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

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
        } catch (error) {
            next(error);
        }
    }
);

recruitmentRouter.patch(
    '/likedRecruit/:id',
    login_required,
    async function (req, res, next) {
        try {
            const recruitmentId = req.params.id;
            const user_id = req.currentUserId;

            const updatedRecruitment = await RecruitmentService.likeRecruitment(
                {
                    recruitmentId,
                    user_id
                }
            );
            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

recruitmentRouter.patch(
    '/unlikedRecruit/:id',
    login_required,
    async function (req, res, next) {
        try {
            const recruitmentId = req.params.id;
            const user_id = req.currentUserId;

            const updatedRecruitment = await RecruitmentService.likeRecruitment(
                { recruitmentId, user_id }
            );
            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

recruitmentRouter.patch(
    '/recruit/approval/:id',
    login_required,
    async function (req, res, next) {
        try {
            const { applicantId } = req.body;
            const recruitmentId = req.params.id;
            const user_id = req.currentUserId;

            const updatedRecruitment = await RecruitmentService.setMember({
                recruitmentId,
                applicantId,
                user_id
            });
            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

export { recruitmentRouter };
