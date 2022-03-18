import React, { useState } from 'react';
import EducationEditForm from './EducationEditForm';
import EducationCard from './EducationCard';
import * as Api from '../../api';

const Education = ({
    portfolioOwnerId,
    education,
    setEducations,
    isEditable
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditing = (e) => {
        setIsEditing(!isEditing);
    };

    const handleDeleting = async (e) => {
        e.preventDefault();
        try {
            await Api.delete('educations', education.id);
            const list = await Api.get('educationlist', portfolioOwnerId);
            setEducations([...list.data]);
        } catch (error) {
            throw new Error(error);
        }
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
                    handleDeleting={handleDeleting}
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
