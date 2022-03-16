import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userAuthService } from '../services/userService';
import { educationAuthService } from '../services/educationService';

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
});

export { educationRouter };
