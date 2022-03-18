import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userAuthService } from '../services/userService';
import { EducationService } from '../services/EducationService';

const educationRouter = Router();
educationRouter.post('/education/create', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }
        const { user_id, school, major, position } = req.body;

        const newEducation = await EducationService.createEducation({
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
});
// user의 전체 education 목록 가져오기
educationRouter.get(
    '/educationlist/:user_id',
    login_required,
    async (req, res, next) => {
        try {
            const user_id = req.params.user_id;
            const educationList = await EducationService.getEducations({
                user_id
            });
            res.status(200).send(educationList);
        } catch (error) {
            next(error);
        }
    }
);

educationRouter.get('/educations/:id', async (req, res, next) => {
    try {
        const education_id = req.params.id;
        const education = await EducationService.getEducation({ education_id });
        res.status(200).send(education);
    } catch (error) {
        next(error);
    }
});

educationRouter.put(
    '/educations/:id',
    login_required,
    async (req, res, next) => {
        try {
            const education_id = req.params.id;
            const { school, major, position } = req.body ?? null;
            const toUpdate = { school, major, position };
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
