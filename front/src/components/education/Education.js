import React, { useState } from 'react';

import EducationEditForm from './EducationEditForm';
import EducationCard from './EducationCard';

const Education = ({ education, setEducations, isEditable }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditing = (e) => {
        setIsEditing(!isEditing);
    };

    return (
        <>
            {/* 편집중이라면 Form을, 그렇지 않다면 학력창을 보여준다. */}
            {isEditing ? (
                <EducationEditForm
                    education={education}
                    setIsEditing={handleEditing}
                    setEducations={setEducations}
                />
            ) : (
                <EducationCard
                    handleEditing={handleEditing}
                    school={education.school}
                    major={education.major}
                    position={education.position}
                    isEditable={isEditable}
                />
            )}
        </>
    );
};

export default Education;
