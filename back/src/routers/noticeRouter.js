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

export { noticeRouter };
