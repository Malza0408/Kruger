import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { userUpdateMiddleware } from '../middlewares/userUpdateMiddleware';
import { UserService } from '../services/UserService';

const userRouter = Router();

// 회원가입
userRouter.post('/user/register', async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                'headers의 Content-Type을 application/json으로 설정해주세요'
            );
        }

        const { name, email, password } = req.body;
        const userData = { name, email, password };
        const newUser = await UserService.addUser(userData);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// 로그인
userRouter.post('/user/login', async function (req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await UserService.getUser({ email, password });

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

// 전체 사용자의 목록을 가져옴
userRouter.get('/userlist', login_required, async function (req, res, next) {
    try {
        const users = await UserService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

// 현재 사용자의 정보를 가져옴
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

// 해당 사용자의 정보를 가져옴
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

// 현재 사용자의 정보를 수정함
userRouter.put(
    '/user/current',
    login_required,
    userUpdateMiddleware,
    async function (req, res, next) {
        try {
            const user_id = req.currentUserId;
            const toUpdate = req.body;

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

// 비밀번호 분실 시 보내 준 이메일로 임시 비밀번호 전송
userRouter.put('/user/resetPassword', async function (req, res, next) {
    try {
        const { email } = req.body;
        await UserService.resetPassword({ email });
        res.status(200).json('메일이 발송되었습니다.');
    } catch (error) {
        next(error);
    }
});

// 특정 사용자 팔로우
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

// 특정 사용자 언팔로우
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

// 회원탈퇴
userRouter.delete(
    '/user/current',
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
