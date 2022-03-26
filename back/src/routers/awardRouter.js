import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { profileUpdateMiddleware } from '../middlewares/profileUpdateMiddleware';
import { AwardService } from '../services/AwardService';

const awardRouter = Router();

// 새로운 수상 요소 작성, 수상과 관련된 내용 필요
awardRouter.post('/award/create', login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }
        const user_id = req.currentUserId;
        const { title, description } = req.body;

        const newAward = await AwardService.addAward({
            user_id,
            title,
            description
        });

        res.status(201).json(newAward);
    } catch (error) {
        next(error);
    }
});

// 사용자의 수상 목록을 얻음
awardRouter.get(
    '/awardlist/:user_id',
    login_required,
    async function (req, res, next) {
        try {
            const user_id = req.params.user_id;
            const awards = await AwardService.getAwards({ user_id });
            res.status(200).send(awards);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 수상 요소의 정보를 가져옴
awardRouter.get('/awards/:id', login_required, async (req, res, next) => {
    try {
        const award_id = req.params.id;
        const currentAwardInfo = await AwardService.getAwardInfo({
            award_id
        });

        res.status(200).send(currentAwardInfo);
    } catch (error) {
        next(error);
    }
});

// 해당 수상 요소 수정
awardRouter.put(
    '/awards/:id',
    login_required,
    profileUpdateMiddleware,
    async function (req, res, next) {
        try {
            const award_id = req.params.id;
            const user_id = req.currentUserId;
            const toUpdate = req.body;
            const updatedAward = await AwardService.setAward({
                award_id,
                user_id,
                toUpdate
            });

            res.status(200).json(updatedAward);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 수상 요소 삭제
awardRouter.delete(
    '/awards/:id',
    login_required,
    async function (req, res, next) {
        try {
            const award_id = req.params.id;
            const user_id = req.currentUserId;
            await AwardService.deleteAward({ award_id, user_id });
            res.status(200).send('삭제되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { awardRouter };
