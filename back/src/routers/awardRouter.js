import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { AwardService } from '../services/AwardService';

const awardAuthRouter = Router();

awardAuthRouter.post(
    '/award/create',
    login_required,
    async (req, res, next) => {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    'headers의 Content-Type을 application/json으로 설정해주세요'
                );
            }
            // login_required에서 currentUserId에 로그인 유저의 id를 넣어둠
            const user_id = req.currentUserId;
            const { title, description } = req.body;
            console.log(user_id, title, description);

            const newAward = await AwardService.addAward({
                user_id,
                title,
                description
            });

            if (newAward.errorMessage) {
                throw new Error(newAward.errorMessage);
            }

            res.status(201).json(newAward);
        } catch (error) {
            next(error);
        }
    }
);

awardAuthRouter.get('/awards/:id', login_required, async (req, res, next) => {
    try {
        const award_id = req.params.id;
        const currentAwardInfo = await AwardService.getAwardInfo({
            award_id
        });

        if (currentAwardInfo.errorMessage) {
            throw new Error(currentAwardInfo.errorMessage);
        }

        res.status(200).send(currentAwardInfo);
    } catch (error) {
        next(error);
    }
});

awardAuthRouter.put(
    '/awards/:id',
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 수상 요소 id를 추출함.
            const award_id = req.params.id;
            // body data 로부터 업데이트할 수상 요소 정보를 추출함.
            const { title, description } = req.body ?? null;

            const toUpdate = { title, description };

            // 해당 수상 요소 아이디로 수상 요소 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
            const updatedAward = await AwardService.setAward({
                award_id,
                toUpdate
            });

            if (updatedAward.errorMessage) {
                throw new Error(updatedAward.errorMessage);
            }

            res.status(200).json(updatedAward);
        } catch (error) {
            next(error);
        }
    }
);

awardAuthRouter.get(
    '/awardlist/:user_id',
    login_required,
    async function (req, res, next) {
        try {
            // 전체 수상 목록을 얻음
            const user_id = req.params.user_id;
            const awards = await AwardService.getAwards({ user_id });
            res.status(200).send(awards);
        } catch (error) {
            next(error);
        }
    }
);

awardAuthRouter.delete(
    '/awards/:id',
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 수상 요소 id를 추출함.
            const award_id = req.params.id;
            await AwardService.deleteAward({ award_id });
            console.log(award_id);
            res.status(200).send('삭제되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { awardAuthRouter };
