import React, { useState } from 'react';

import EducationEditForm from './EducationEditForm';
import * as Api from '../../api';
import EducationCard from './EducationCard';

const Education = ({ education, setEducations }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [schoolInput, setSchoolInput] = useState('');
    const [majorInput, setMajorInput] = useState('');
    const [positionValue, setPositionValue] = useState('');

    const handleEditing = (e) => {
        setIsEditing(!isEditing);
    };
    const handleSchoolOnChange = (e) => {
        setSchoolInput(e.target.value);
    };
    const handleMajorOnChange = (e) => {
        setMajorInput(e.target.value);
    };
    const handleCheckOnClick = (e) => {
        setPositionValue(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 칸을 비워놨다면 값을 받지 않는다.
        if (schoolInput && majorInput && positionValue) {
            await Api.put(`educations/${education.id}`, {
                user_id: education.user_id,
                school: schoolInput,
                major: majorInput,
                position: positionValue,
            });
            setIsEditing(false);
            const educationlist = await Api.get(
                `educationlist/${education.user_id}`
            );
            setEducations([...educationlist.data]);
        }
    };

    return (
        <>
            {/* 편집중이라면 Form을, 그렇지 않다면 학력창을 보여준다. */}
            {isEditing ? (
                <EducationEditForm
                    handleSchoolOnChange={handleSchoolOnChange}
                    handleMajorOnChange={handleMajorOnChange}
                    schoolInput={schoolInput}
                    majorInput={majorInput}
                    handleCheckOnClick={handleCheckOnClick}
                    handleSubmit={handleSubmit}
                    handleEditing={handleEditing}
                />
            ) : (
                <EducationCard
                    handleEditing={handleEditing}
                    school={education.school}
                    major={education.major}
                    position={education.position}
                />
            )}
        </>
    );
};

export default Education;
