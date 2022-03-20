import { ProjectModel } from '../schemas/project';

class Project {
    // 새로운 프로젝트 요소 작성, 프로젝트와 관련된 내용 필요
    static async create({ newProject }) {
        const createdNewProject = await ProjectModel.create(newProject);
        return createdNewProject;
    }

    // 같은 user_id를 가진 모든 프로젝트 요소들을 불러옴
    static async findAll({ user_id }) {
        const projects = await ProjectModel.find({ user_id });
        return projects;
    }

    // id를 통해 해당 프로젝트 요소를 가져옴
    static async findById({ project_id }) {
        const project = await ProjectModel.findOne({ id: project_id });
        return project;
    }

    // id를 통해 해당 프로젝트 요소를 수정함
    static async update(project_id, key, value) {
        const filter = { id: project_id };
        const update = { [key]: value };
        const option = { returnOriginal: false };

        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedProject;
    }

    // id를 통해 해당 프로젝트 요소를 삭제함
    static async deleteById({ project_id }) {
        await ProjectModel.deleteOne({ id: project_id });
        return;
    }
}

export { Project };
