import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { projectAuthService } from '../services/projectService';

const projectAuthRouter = Router();

projectAuthRouter.post(
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
            const title = req.body.title;
            const description = req.body.description;
            const from_date = req.body.from_date;
            const to_date = req.body.to_date;
            console.log(user_id, title, description, from_date, to_date);

            const newProject = await projectAuthService.addProject({
                user_id,
                title,
                description,
                from_date,
                to_date
            });

            if (newProject.errorMessage) {
                throw new Error(newProject.errorMessage);
            }

            res.status(201).json(newProject);
        } catch (error) {
            next(error);
        }
    }
);

projectAuthRouter.get(
    '/projects/:id',
    login_required,
    async (req, res, next) => {
        try {
            const project_id = req.params.id;
            const currentProjectInfo = await projectAuthService.getProjectInfo({
                project_id
            });

            if (currentProjectInfo.errorMessage) {
                throw new Error(currentProjectInfo.errorMessage);
            }

            res.status(200).send(currentProjectInfo);
        } catch (error) {
            next(error);
        }
    }
);
