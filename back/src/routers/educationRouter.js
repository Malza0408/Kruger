import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userAuthService } from '../services/userService';
import { educationService } from '../services/educationService';

const educationRouter = Router();
educationRouter.post('/education/create', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }
        const user_id = req.body.user_id;
        const school = req.body.school;
        const major = req.body.major;
        const position = req.body.position;

        const newEducation = await educationService.createEducation({
            user_id,
            school,
            major,
            position
        });
        if (newEducation.errorMessage) {
            throw new Error(newEducation.errorMessage);
        }
        console.log('education 생성되었습니다.');
        res.status(201).json(newEducation);
    } catch (error) {
        next(error);
    }
});

educationRouter.get('/educationlist/:user_id', async (req, res, next) => {
    try {
        const educationList = await educationService.getEducations();
        res.status(200).send(educationList);
    } catch (error) {
        next(error);
    }
});

educationRouter.get('/educations/:id', async (req, res, next) => {
    try {
        const education_id = req.params.id;
        const education = await educationService.getEducation({ education_id });
        if (education.errorMessage) {
            throw new Error(education.errorMessage);
        }
        res.status(200).send(education);
    } catch (error) {
        next(error);
    }
});

educationRouter.put('/educations/:id', async (req, res, next) => {
    try {
        const education_id = req.params.id;
        const school = req.body.school ?? null;
        const major = req.body.major ?? null;
        const position = req.body.position ?? null;
        const toUpdate = { school, major, position };
        const updatedEducation = await educationService.setEducation({
            education_id,
            toUpdate
        });
        if (updatedEducation.errorMessage) {
            throw new Error(errorMessage);
        }
        console.log('수정되었습니다.');
        res.status(200).json(updatedEducation);
    } catch (error) {
        next(error);
    }
});

export { educationRouter };
