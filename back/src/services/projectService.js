import { Project } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class projectAuthService {
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
        createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

        return createdNewProject;
    }

    static async getProjectInfo({ project_id }) {
        const project = await Project.findById({ project_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!project) {
            const errorMessage = '삭제되었거나 등록되지 않은 프로젝트입니다.';
            return { errorMessage };
        }

        return project;
    }

    static async setProject({ project_id, toUpdate }) {
        // 우선 해당 id 의 수상내역이 db에 존재하는지 여부 확인
        let project = await Project.findById({ project_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!project) {
            const errorMessage = '삭제되었거나 등록되지 않은 프로젝트입니다.';
            return { errorMessage };
        }

        // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.title) {
            const fieldToUpdate = 'title';
            const newValue = toUpdate.title;
            project = await Project.update({
                project_id,
                fieldToUpdate,
                newValue
            });
        }

        if (toUpdate.description) {
            const fieldToUpdate = 'description';
            const newValue = toUpdate.description;
            project = await Project.update({
                project_id,
                fieldToUpdate,
                newValue
            });
        }

        if (toUpdate.from_date) {
            const fieldToUpdate = 'from_date';
            const newValue = toUpdate.from_date;
            project = await Project.update({
                project_id,
                fieldToUpdate,
                newValue
            });
        }

        if (toUpdate.to_date) {
            const fieldToUpdate = 'to_date';
            const newValue = toUpdate.to_date;
            project = await Project.update({
                project_id,
                fieldToUpdate,
                newValue
            });
        }

        return project;
    }

    static async getProjects({ user_id }) {
        const projects = await Project.findAllById({ user_id });
        return projects;
    }

    static async deleteProject({ project_id }) {
        await Project.deleteById({ project_id });
        return;
    }
}

export { projectAuthService };
