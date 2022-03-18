import React, { useState } from 'react';

import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

const Project = ({ project, setProjects, isEditable }) => {
    // useState 훅을 통해 isEditing 상태를 생성함.
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            {/* 편집 상태일때는 AwardEditForm을 렌더링 아닐때는 AwardCard를 렌더링 */}
            {isEditing ? (
                <ProjectEditForm
                    setIsEditing={setIsEditing}
                    project={project}
                    setProjects={setProjects}
                />
            ) : (
                <ProjectCard
                    setIsEditing={setIsEditing}
                    project={project}
                    setProjects={setProjects}
                    isEditable={isEditable}
                />
            )}
        </>
    );
};

export default Project;
