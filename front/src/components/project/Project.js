import React, { useState } from 'react';

import ProjectCard from './ProjectCard';
import ProjectEditForm from './ProjectEditForm';

const Project = ({ isEditing, setIsEditing, isAdding, setIsAdding }) => {
  return (
    <>
      {isEditing ? (
        <ProjectEditForm setIsEditing={setIsEditing} />
      ) : (
        <ProjectCard
          setIsEditing={setIsEditing}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
      )}
    </>
  );
};

export default Project;
