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
    const [inputInfo, setInputInfo] = useState({
        school: '',
        major: {
            first: '',
            second: ''
        },
        position: ''
    });

    const handleEditing = async (e) => {
        setIsEditing(!isEditing);

        try {
            const result = await Api.get('educations', education.id);
            const { school, major, position } = result.data;
            setInputInfo({
                school,
                major,
                position
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleEditCancel = () => {
        setIsEditing(!isEditing);
    };

    const handleDeleting = async (e) => {
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
                    handleEditCancel={handleEditCancel}
                    setEducations={setEducations}
                    inputInfo={inputInfo}
                    setInputInfo={setInputInfo}
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
