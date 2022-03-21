import { User, Award, Certificate, Education, Project, Note } from '../db';

const verifyUser = async (req, res, next) => {
    try {
        const currentUser = req.currentUserId;
        const dataId = req.params.id;
        let targetData = '';
        // uri 정제해서 모델과 동일하게 변경
        // let path = req.route.path.split('/')[1];
        // path = path[0].toUpperCase() + path.slice(1, -1);
        // console.log(path);
        const targetUser = req.body.user_id ?? null;

        // 로그인한유저와 변경하려는 데이터의유저가 같을 때 진행
        if (currentUser === targetUser) {
            next();
        }

        const errorMessage = '다른 사람정보를 변경할 수 없습니다.';
        return res.status(400).json(errorMessage);
        // update, delete 에서 data의 id로 db를 통해 user_id가져옴
        // if (targetUser === null) {
        //     if (path === 'Education') {
        //         const a = await Education.findById({ dataId });
        //         console.log(a);
        //     }
        //     if (targetData.user_id !== currentUser) {
        //         const errorMessage = '다른 사람정보를 변경할 수 없습니다.';
        //         return res.status(400).json(errorMessage);
        //     }
        // }

        // console.log('바꾸려는 유저', targetUser);
    } catch (error) {
        next(error);
    }
};

export { verifyUser };
