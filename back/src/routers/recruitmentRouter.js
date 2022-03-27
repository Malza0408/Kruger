import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { recruitmentUpdateMiddleware } from '../middlewares/recruitmentUpdateMiddleware';
import { languageMiddleware } from '../middlewares/languageMiddleward';
import { RecruitmentService } from '../services/RecruitmentService';
import { NoteService } from '../services/NoteService';

const recruitmentRouter = Router();

// 새로운 게시글 생성
recruitmentRouter.post(
    '/recruit/create',
    login_required,
    languageMiddleware,
    async (req, res, next) => {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    'headers의 Content-Type을 application/json으로 설정해주세요'
                );
            }
            const { title, detail, language } = req.body;
            const user_id = req.currentUserId;

            const newRecruitment = await RecruitmentService.addRecruitment({
                user_id,
                title,
                detail,
                language
            });
            res.status(201).json(newRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

// 게시글 목록 보기
recruitmentRouter.get(
    '/recruitlist',
    login_required,
    async (req, res, next) => {
        try {
            const recruitmentList = await RecruitmentService.getRecruitments();
            res.status(200).json(recruitmentList);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 게시글의 정보를 가져옴
recruitmentRouter.get(
    '/recruit/:id',
    login_required,
    async (req, res, next) => {
        try {
            const recruitmentId = req.params.id;
            const recruitments = await RecruitmentService.getRecruitment({
                recruitmentId
            });
            res.status(200).json(recruitments);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 게시글 수정 (팀장만 가능)
recruitmentRouter.put(
    '/recruit/:id',
    login_required,
    languageMiddleware,
    recruitmentUpdateMiddleware,
    async function (req, res, next) {
        try {
            const recruitmentId = req.params.id;
            const user_id = req.currentUserId;
            const toUpdate = req.body;

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

// 게시글 모집마감 토글 (팀장만 가능)
recruitmentRouter.patch(
    '/recruit/toggle/:id',
    login_required,
    async (req, res, next) => {
        try {
            const recruitmentId = req.params.id;
            const userId = req.currentUserId;
            const { nowEnrolling, message } =
                await RecruitmentService.closeRecruitment({
                    recruitmentId,
                    userId
                });
            res.status(200).json({ nowEnrolling, message });
        } catch (error) {
            next(error);
        }
    }
);

// 해당 게시글에 지원
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

// 해당 게시글에 지원 취소
recruitmentRouter.patch(
    '/recruit/cancle/apply/:id',
    login_required,
    async (req, res, next) => {
        try {
            const recruitmentId = req.params.id;
            const applicantId = req.currentUserId;
            const updatedRecruitment = await RecruitmentService.cancleApplicant(
                {
                    recruitmentId,
                    applicantId
                }
            );
            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

// 멤버 승인하기 (+ 쪽지 보내줌, 팀장만 가능)
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

            const title = updatedRecruitment.title;
            const content =
                '저희 팀의 멤버가 되셨습니다. 우리 함께 정말 멋진 프로젝트를 완성해보아요!!';
            await NoteService.addNote({
                user_id,
                to: applicantId,
                title,
                content
            });

            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

// 게시물에 좋아요 / 좋아요 취소 (toggle)
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

// 새로운 댓글 추가
recruitmentRouter.put(
    '/recruit/comment/:id',
    login_required,
    async function (req, res, next) {
        try {
            const { content } = req.body;
            const recruitmentId = req.params.id;
            const user_id = req.currentUserId;

            const newComment = await RecruitmentService.addComment({
                content,
                recruitmentId,
                user_id
            });
            res.status(200).json(newComment);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 댓글 수정
recruitmentRouter.patch(
    '/recruit/:id/:commentId',
    login_required,
    recruitmentUpdateMiddleware,
    async (req, res, next) => {
        try {
            const recruitmentId = req.params.id;
            const commentId = req.params.commentId;
            const authorId = req.currentUserId;
            const toUpdate = req.body;
            const updatedRecruitment = await RecruitmentService.setComment({
                recruitmentId,
                commentId,
                authorId,
                toUpdate
            });
            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 댓글 삭제
recruitmentRouter.patch(
    '/recruit/delete/:id/:commentId',
    login_required,
    async (req, res, next) => {
        try {
            const recruitmentId = req.params.id;
            const commentId = req.params.commentId;
            const authorId = req.currentUserId;
            const updatedRecruitment = await RecruitmentService.deleteComment({
                recruitmentId,
                commentId,
                authorId
            });
            res.status(200).json(updatedRecruitment);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 게시글 삭제
recruitmentRouter.delete(
    '/recruit/delete/:id',
    login_required,
    async function (req, res, next) {
        try {
            const recruitmentId = req.params.id;
            const user_id = req.currentUserId;
            await RecruitmentService.deleteRecruitment({
                recruitmentId,
                user_id
            });
            res.status(200).json('삭제되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { recruitmentRouter };
