import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { updateMiddleware } from '../middlewares/updateMiddleware';
import { NoticeService } from '../services/NoticeService';

const noticeRouter = Router();

noticeRouter.put(
    '/notice/:id',
    login_required,
    updateMiddleware,
    async function (req, res, next) {
        try {
            const notice_id = req.params.id;
            const user_id = req.currentUserId;
            const toUpdate = req.toUpdate;

            const updatedNotice = await NoticeService.setNotice({
                notice_id,
                user_id,
                toUpdate
            });

            res.status(200).json(updatedNotice);
        } catch (error) {
            next(error);
        }
    }
);

noticeRouter.post('/notice/create', login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }
        const { title, detail } = req.body;
        const user_id = req.currentUserId;
        console.log('여기', user_id, title, detail);
        const newNotice = await NoticeService.addNotice({
            user_id,
            title,
            detail
        });
        res.status(201).json(newNotice);
    } catch (error) {
        next(error);
    }
});

noticeRouter.patch('/notice/:id', login_required, async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
});

export { noticeRouter };
