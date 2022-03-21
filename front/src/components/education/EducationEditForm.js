import React, { useState } from 'react';
import * as Api from '../../api';
import DefaultForm from './DefaultForm';

const EducationEditForm = ({
    education,
    handleEditCancel,
    setEducations,
    inputInfo,
    setInputInfo
}) => {
    const [schoolInput, setSchoolInput] = useState('');
    const [majorInput, setMajorInput] = useState('');
    const [positionValue, setPositionValue] = useState('');

    const [isSchoolEmpty, setIsSchoolEmpty] = useState(false);
    const [isMajorEmpty, setIsMajorEmpty] = useState(false);

    const handleSchoolOnChange = (e) => {
        setSchoolInput(e.target.value);
        setInputInfo((current) => {
            return {
                ...current,
                school: e.target.value
            };
        });
    };
    const handleMajorOnChange = (e) => {
        setMajorInput(e.target.value);
        setInputInfo((current) => {
            return {
                ...current,
                major: e.target.value
            };
        });
    };
    const handleCheckOnClick = (e) => {
        setPositionValue(e.target.value);
        setInputInfo((current) => {
            return {
                ...current,
                position: e.target.value
            };
        });
        // console.log(e.target);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 칸을 비워놨다면 값을 받지 않는다.
        try {
            // school 공란이면 true
            setIsSchoolEmpty(!schoolInput);
            // major 공란이면 true
            setIsMajorEmpty(!majorInput);
            await Api.put(`educations/${education.id}`, {
                user_id: education.user_id,
                school: schoolInput ? schoolInput : inputInfo.school,
                major: majorInput ? majorInput : inputInfo.major,
                position: positionValue ? positionValue : inputInfo.position
            });
            handleEditCancel(false);
            const educationlist = await Api.get(
                `educationlist/${education.user_id}`
            );
            setEducations([...educationlist.data]);
        } catch (error) {
            throw new Error(error);
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
            handleFunction={handleEditCancel}
            inputInfo={inputInfo}
            isSchoolEmpty={isSchoolEmpty}
            isMajorEmpty={isMajorEmpty}
        />
    );
};

export default EducationEditForm;
