import React, { useState } from 'react';
import * as Api from '../../api';
import DefaultForm from './DefaultForm';

const EducationAddForm = ({ setAddState, setEducations, portfolioOwnerId }) => {
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [position, setPosition] = useState('');

    const handleSchoolOnChange = (e) => {
        setSchool(e.target.value);
    };

    const handleMajorOnChange = (e) => {
        setMajor(e.target.value);
    };

    const handleCheckOnClick = (e) => {
        setPosition(e.target.value);
    };

    // education을 생성한다.
    const handleSubmit = async (e) => {
        e.preventDefault();
        await Api.post('education/create', {
            user_id: portfolioOwnerId,
            school,
            major,
            position,
        });
        const educations = await Api.get(`educationlist/${portfolioOwnerId}`);
        setEducations([...educations.data]);
        setAddState(false);
    };

    const handleOnClick = () => {
        setAddState(false);
    };

    return (
        <DefaultForm
            handleSchoolOnChange={handleSchoolOnChange}
            handleMajorOnChange={handleMajorOnChange}
            school={school}
            major={major}
            handleCheckOnClick={handleCheckOnClick}
            handleSubmit={handleSubmit}
            handleFunction={handleOnClick}
        />
    );
};

export default EducationAddForm;
