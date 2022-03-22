import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { updateMiddleware } from '../middlewares/updateMiddleware';
import { ProjectService } from '../services/ProjectService';

const projectRouter = Router();

projectRouter.post(
    '/project/create',
    login_required,
    async (req, res, next) => {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    'headers의 Content-Type을 application/json으로 설정해주세요'
                );
            }
            // login_required에서 currentUserId에 로그인 유저의 id를 넣어둠
            const user_id = req.currentUserId;
            const { title, description, from_date, to_date } = req.body;
            console.log(user_id, title, description, from_date, to_date);

            const newProject = await ProjectService.addProject({
                user_id,
                title,
                description,
                from_date,
                to_date
            });

            res.status(201).json(newProject);
        } catch (error) {
            next(error);
        }
    }
);

projectRouter.get(
    '/projectlist/:user_id',
    login_required,
    async function (req, res, next) {
        try {
            // 전체 프로젝트 목록을 얻음
            const user_id = req.params.user_id;
            const projects = await ProjectService.getProjects({ user_id });
            res.status(200).send(projects);
        } catch (error) {
            next(error);
        }
    }
);

projectRouter.get('/projects/:id', login_required, async (req, res, next) => {
    try {
        const project_id = req.params.id;
        const currentProjectInfo = await ProjectService.getProjectInfo({
            project_id
        });

        res.status(200).send(currentProjectInfo);
    } catch (error) {
        next(error);
    }
});

projectRouter.put(
    '/projects/:id',
    login_required,
    updateMiddleware,
    async function (req, res, next) {
        try {
            // URI로부터 프로젝트 id를 추출함.
            const project_id = req.params.id;
            const user_id = req.currentUserId;
            // body data 로부터 업데이트할 프로젝트 정보를 추출함.
            const toUpdate = req.toUpdate;

            // 해당 프로젝트 아이디로 프로젝트 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
            const updatedProject = await ProjectService.setProject({
                project_id,
                user_id,
                toUpdate
            });

            res.status(200).json(updatedProject);
        } catch (error) {
            next(error);
        }
    }
);

projectRouter.delete(
    '/projects/:id',
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 프로젝트 id를 추출함.
            const project_id = req.params.id;
            const user_id = req.currentUserId;
            await ProjectService.deleteProject({ project_id, user_id });
            console.log(project_id);
            res.status(200).send('삭제되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { projectRouter };
