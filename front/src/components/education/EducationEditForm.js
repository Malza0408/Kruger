import React, { useState } from 'react';
import * as Api from '../../api';
import DefaultForm from './DefaultForm';

const EducationEditForm = ({ education, setIsEditing, setEducations }) => {
    const [schoolInput, setSchoolInput] = useState('');
    const [majorInput, setMajorInput] = useState('');
    const [positionValue, setPositionValue] = useState('');

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
            try {
                await Api.put(`educations/${education.id}`, {
                    user_id: education.user_id,
                    school: schoolInput,
                    major: majorInput,
                    position: positionValue
                });
                setIsEditing(false);
                const educationlist = await Api.get(
                    `educationlist/${education.user_id}`
                );
                setEducations([...educationlist.data]);
            } catch (error) {
                throw new Error(error);
            }
        }
    };
    return (
        <DefaultForm
            handleSchoolOnChange={handleSchoolOnChange}
            handleMajorOnChange={handleMajorOnChange}
            school={schoolInput}
            major={majorInput}
            handleCheckOnClick={handleCheckOnClick}
            handleSubmit={handleSubmit}
            handleFunction={setIsEditing}
        />
    );
};

export default EducationEditForm;
