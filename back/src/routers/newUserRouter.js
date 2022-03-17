import is from '@sindresorhus/is';
import { Router } from 'express';
import { newUserService } from '../services/newUserService';

const userAuthRouter = Router();

userAuthRouter.post('/user/register', async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }
        console.log('라우터 연결');
        //req 에서 데이터 가져오기
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        //가져온 데이터를 유저 db에 추가하기
        const createdUser = await newUserService.addUser({
            name,
            email,
            password
        });
        if (createdUser.errorMessage) {
            throw new Error(createdUser.errorMessage);
        }
        console.log('user 생성됨');
        res.status(201).json(createdUser);
    } catch (error) {
        next(error);
    }
});

userAuthRouter.post('/user/login', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await newUserService.getUser({ email, password });
        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }
        console.log('로그인 함');
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

export { userAuthRouter };
