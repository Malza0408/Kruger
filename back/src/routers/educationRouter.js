import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userAuthService } from '../services/userService';
import { educationAuthService } from '../services/educationService';

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
            const user_id = req.body.user_id;
            const school = req.body.school;
            const major = req.body.major;
            const position = req.body.position;
            console.log(user_id, school, major, position);

            const createdEducation = await educationAuthService.addEducation({
                user_id,
                school,
                major,
                position
            });
            if (createdEducation.errorMessage) {
                throw new Error(createdEducation.errorMessage);
            }
            res.status(201).json(createdEducation);
        } catch (error) {
            next(error);
        }
    }
);
educationRouter.get(
    '/educations/:id',
    login_required,
    async (req, res, next) => {
        try {
            const education_id = req.params.id;
            // console.log(education_id);
            const education = await educationAuthService.getEducation({
                education_id
            });
            if (education.errorMessage) {
                throw new Error(education.errorMessage);
            }
            res.status(200).send(education);
        } catch (error) {
            next(error);
        }
    }
);
educationRouter.put(
    '/educations/:id',
    login_required,
    async (req, res, next) => {
        try {
            const education_id = req.params.id;
            console.log(education_id);
            const school = req.body.school;
            const major = req.body.major;
            const position = req.body.position;
            console.log(school);
            console.log(major);
            console.log(position);
            const toUpdate = { school, major, position };
            const updatedEducation = await educationAuthService.edit({
                education_id,
                toUpdate
            });
            if (updatedEducation.errorMessage) {
                throw new Error(updatedEducation.errorMessage);
            }
            res.status(200).json(updatedEducation);
        } catch (error) {
            next(error);
        }
    }
);
educationRouter.get(
    '/educationlist/:user_id',
    login_required,
    async (req, res, next) => {
        try {
            const user_id = req.params.user_id;
            const educationList = await educationAuthService.getEducationList({
                user_id
            });
            res.status(200).send(educationList);
        } catch (error) {
            next(error);
        }
    }
);

export { educationRouter };
