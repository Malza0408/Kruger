import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userUpdateMiddleware } from '../middlewares/userUpdateMiddleware';
import { UserService } from '../services/UserService';

const userRouter = Router();

userRouter.post('/user/register', async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        // req (request) 에서 데이터 가져오기
        const { name, email, password } = req.body;
        console.log(name, email, password);
        // 위 데이터를 유저 db에 추가하기
        const userData = { name, email, password };
        const newUser = await UserService.addUser(userData);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/user/login', async function (req, res, next) {
    try {
        // req (request) 에서 데이터 가져오기
        const { email, password } = req.body;

        // 위 데이터를 이용하여 유저 db에서 유저 찾기
        const user = await UserService.getUser({ email, password });

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/userlist', login_required, async function (req, res, next) {
    try {
        // 전체 사용자 목록을 얻음
        const users = await UserService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

userRouter.get(
    '/user/current',
    login_required,
    async function (req, res, next) {
        try {
            // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
            const user_id = req.currentUserId;
            const currentUserInfo = await UserService.getUserInfo({
                user_id
            });

            res.status(200).send(currentUserInfo);
        } catch (error) {
            next(error);
        }
    }
);

userRouter.get('/users/:id', login_required, async function (req, res, next) {
    try {
        const user_id = req.params.id;
        const currentUserInfo = await UserService.getUserInfo({
            user_id
        });

        res.status(200).send(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userRouter.put(
    '/users/:id',
    login_required,
    userUpdateMiddleware,
    async function (req, res, next) {
        try {
            // URI로부터 사용자 id를 추출함.
            const user_id = req.params.id;
            // body data 로부터 업데이트할 사용자 정보를 추출함
            const toUpdate = req.body;
            console.log(toUpdate);

            // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
            const updatedUser = await UserService.setUser({
                user_id,
                toUpdate
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
);

userRouter.put('/user/resetPassword', async function (req, res, next) {
    try {
        const { email } = req.body;
        await UserService.resetPassword({ email });
        res.status(200).json('메일이 발송되었습니다.');
    } catch (error) {
        next(error);
    }
});

// 친구추가
userRouter.put('/followUser/:id', login_required, async (req, res, next) => {
    try {
        const followedId = req.params.id;
        const user_id = req.currentUserId;
        const updatedUser = await UserService.followUser({
            followedId,
            user_id
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

userRouter.put('/unfollowUser/:id', login_required, async (req, res, next) => {
    try {
        const unfollowedId = req.params.id;
        const user_id = req.currentUserId;
        const updatedUser = await UserService.unfollowUser({
            unfollowedId,
            user_id
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

userRouter.delete(
    '/users/:id',
    login_required,
    async function (req, res, next) {
        try {
            const user_id = req.currentUserId;
            await UserService.deleteUser({ user_id });
            res.status(200).send('탈퇴되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { userRouter };
