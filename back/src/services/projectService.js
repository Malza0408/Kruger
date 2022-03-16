import { Project } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class projectAuthService {
    static async addProject({ user_id, title, description }) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newProject = { id, user_id, title, description };

        console.log(newProject);

        // db에 저장
        const createdNewProject = await Project.create({ newProject });
        createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

        return createdNewProject;
    }
}

export { projectAuthService };
