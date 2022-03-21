import { Project } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class ProjectService {
    static async addProject({
        user_id,
        title,
        description,
        from_date,
        to_date
    }) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newProject = {
            id,
            user_id,
            title,
            description,
            from_date,
            to_date
        };

        console.log(newProject);

        // db에 저장
        const createdNewProject = await Project.create({ newProject });

        return createdNewProject;
    }

    static async getProjects({ user_id }) {
        const projects = await Project.findAll({ user_id });
        return projects;
    }

    static async getProjectInfo({ project_id }) {
        const project = await Project.findById({ project_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!project) {
            const errorMessage = '삭제되었거나 등록되지 않은 프로젝트입니다.';
            throw new Error(errorMessage);
        }

        return project;
    }

    static async setProject({ project_id, toUpdate }) {
        // 우선 해당 id 의 프로젝트내역이 db에 존재하는지 여부 확인
        let project = await Project.findById({ project_id });
        const keys = Object.keys(toUpdate);
        const values = Object.values(toUpdate);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!project) {
            const errorMessage = '삭제되었거나 등록되지 않은 프로젝트입니다.';
            throw new Error(errorMessage);
        }

        for (let i = 0; i < keys.length; i++) {
            project = await Project.update(project_id, keys[i], values[i]);
        }

        return project;
    }

    static async deleteProject({ project_id }) {
        await Project.deleteById({ project_id });
        return;
    }
}

export { ProjectService };
