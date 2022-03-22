import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { updateMiddleware } from '../middlewares/updateMiddleware';
import { NoticeService } from '../services/NoticeService';

const noticeRouter = Router();

export { noticeRouter };
