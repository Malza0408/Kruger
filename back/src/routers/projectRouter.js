import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { profileUpdateMiddleware } from '../middlewares/profileUpdateMiddleware';
import { ProjectService } from '../services/ProjectService';

const projectRouter = Router();

// 새로운 프로젝트 요소 추가
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
            const user_id = req.currentUserId;
            const { title, description, from_date, to_date } = req.body;

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

// 사용자의 프로젝트 목록을 가져옴
projectRouter.get(
    '/projectlist/:user_id',
    login_required,
    async function (req, res, next) {
        try {
            const user_id = req.params.user_id;
            const projects = await ProjectService.getProjects({ user_id });
            res.status(200).send(projects);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 프로젝트 요소의 정보를 가져옴
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

// 해당 프로젝트 요소 수정
projectRouter.put(
    '/projects/:id',
    login_required,
    profileUpdateMiddleware,
    async function (req, res, next) {
        try {
            // URI로부터 프로젝트 id를 추출함.
            const project_id = req.params.id;
            const user_id = req.currentUserId;
            // body data 로부터 업데이트할 프로젝트 정보를 추출함.
            const toUpdate = req.body;

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

// 해당 프로젝트 요소 삭제
projectRouter.delete(
    '/projects/:id',
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 프로젝트 id를 추출함.
            const project_id = req.params.id;
            const user_id = req.currentUserId;
            await ProjectService.deleteProject({ project_id, user_id });
            res.status(200).json('삭제되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { projectRouter };
