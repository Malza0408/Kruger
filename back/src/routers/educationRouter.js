import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { educationUpdateMiddleware } from '../middlewares/educationUpdateMiddleware';
import { EducationService } from '../services/EducationService';

const educationRouter = Router();

// 새로운 학력 요소 추가
educationRouter.post(
    '/education/create',
    login_required,
    async (req, res, next) => {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    'headers의 Content-Type을 application/json으로 설정해주세요'
                );
            }
            const user_id = req.currentUserId;
            const { school, major, position } = req.body;

            if (Object.values(major).length === 0) {
                const errorMessage = '전공을 입력해주세요.';
                return res.status(400).send(errorMessage);
            }

            const newEducation = await EducationService.addEducation({
                user_id,
                school,
                major,
                position
            });
            res.status(201).json(newEducation);
        } catch (error) {
            next(error);
        }
    }
);
// 사용자의 학력 목록을 가져옴
educationRouter.get(
    '/educationlist/:user_id',
    login_required,
    async (req, res, next) => {
        try {
            const user_id = req.params.user_id;
            const educations = await EducationService.getEducations({
                user_id
            });
            res.status(200).send(educations);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 학력 요소의 정보를 가져옴
educationRouter.get('/educations/:id', async (req, res, next) => {
    try {
        const education_id = req.params.id;
        const education = await EducationService.getEducationInfo({
            education_id
        });
        res.status(200).send(education);
    } catch (error) {
        next(error);
    }
});

// 해당 학력 요소 수정
educationRouter.put(
    '/educations/:id',
    login_required,
    educationUpdateMiddleware,
    async (req, res, next) => {
        try {
            const education_id = req.params.id;
            const user_id = req.currentUserId;
            const toUpdate = req.body;

            const updatedEducation = await EducationService.setEducation({
                education_id,
                user_id,
                toUpdate
            });
            res.status(200).json(updatedEducation);
        } catch (error) {
            next(error);
        }
    }
);

//해당 학력 요소 삭제
educationRouter.delete(
    '/educations/:id',
    login_required,
    async (req, res, next) => {
        try {
            const education_id = req.params.id;
            const user_id = req.currentUserId;
            await EducationService.deleteEducation({ education_id, user_id });
            res.status(200).send('삭제되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { educationRouter };
