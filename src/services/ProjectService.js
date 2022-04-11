import { Project } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class ProjectService {
    // 프로젝트 생성
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

        // db에 저장
        const createdNewProject = await Project.create({ newProject });

        return createdNewProject;
    }

    // 프로젝트 목록 보기
    static async getProjects({ user_id }) {
        const projects = await Project.findAll({ user_id });
        return projects;
    }
    // 프로젝트 1개 보기
    static async getProjectInfo({ project_id }) {
        // 해당 id의 프로젝트가 db에 존재하는지 확인
        const project = await Project.findById({ project_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!project) {
            const errorMessage = '삭제되었거나 등록되지 않은 프로젝트입니다.';
            throw new Error(errorMessage);
        }

        return project;
    }
    // 프로젝트 수정하기
    static async setProject({ project_id, user_id, toUpdate }) {
        // 해당 id의 프로젝트가 db에 존재하는지 확인
        let project = await Project.findById({ project_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!project) {
            const errorMessage = '삭제되었거나 등록되지 않은 프로젝트입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 프로젝트 생성자인지 확인
        if (project.user_id !== user_id) {
            const errorMessage = '수정할 수 없습니다.';
            throw new Error(errorMessage);
        }

        const keys = Object.keys(toUpdate);
        const values = Object.values(toUpdate);

        for (let i = 0; i < keys.length; i++) {
            project = await Project.update(project_id, keys[i], values[i]);
        }

        return project;
    }

    // 프로젝트 삭제하기
    static async deleteProject({ project_id, user_id }) {
        // 해당 id의 프로젝트가 db에 존재하는지 확인
        const project = await Project.findById({ project_id });

        if (!project) {
            const errorMessage = '삭제되었거나 등록되지 않은 프로젝트입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 프로젝트 생성자인지 확인
        if (project.user_id !== user_id) {
            const errorMessage = '삭제할 수 없습니다.';
            throw new Error(errorMessage);
        }
        await Project.deleteById({ project_id });
        return;
    }
}

export { ProjectService };
