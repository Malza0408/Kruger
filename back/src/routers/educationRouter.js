import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { updateMiddleware } from '../middlewares/updateMiddleware';
import { userAuthService } from '../services/userService';
import { EducationService } from '../services/EducationService';

const educationRouter = Router();

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
            if (major.length === 0) {
                console.log('전공 비워짐');
                const errorMessage = '전공을 입력해주세요.';
                return res.status(400).send(errorMessage);
            }
            console.log('전공 없는데 진행?');
            const newEducation = await EducationService.addEducation({
                user_id,
                school,
                major,
                position
            });
            console.log('education 생성되었습니다.');
            res.status(201).json(newEducation);
        } catch (error) {
            next(error);
        }
    }
);
// user의 전체 education 목록 가져오기
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

educationRouter.put(
    '/educations/:id',
    login_required,
    updateMiddleware,
    async (req, res, next) => {
        try {
            const education_id = req.params.id;
            const toUpdate = req.toUpdate;
            const updatedEducation = await EducationService.setEducation({
                education_id,
                toUpdate
            });
            console.log('수정되었습니다.');
            res.status(200).json(updatedEducation);
        } catch (error) {
            next(error);
        }
    }
);
educationRouter.delete(
    '/educations/:id',
    login_required,
    async (req, res, next) => {
        try {
            const education_id = req.params.id;
            await EducationService.deleteEducation({ education_id });
            res.status(200).send('삭제되었습니다.');
            console.log('삭제되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { educationRouter };
