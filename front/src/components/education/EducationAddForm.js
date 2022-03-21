import React, { useState } from 'react';
import * as Api from '../../api';
import DefaultForm from './DefaultForm';

const EducationAddForm = ({ setAddState, setEducations, portfolioOwnerId }) => {
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [position, setPosition] = useState('재학중');

    const [isSchoolEmpty, setIsSchoolEmpty] = useState(false) 
    const [isMajorEmpty, setIsMajorEmpty] = useState(false) 

    const handleSchoolOnChange = (e) => {
        setSchool(e.target.value);
    };

    const handleMajorOnChange = (e) => {
        setMajor(e.target.value);
    };

    const handleCheckOnClick = (e) => {
        setPosition(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // school 공란이면 true 
            setIsSchoolEmpty(!school) 
            // major 공란이면 true 
            setIsMajorEmpty(!major) 

            await Api.post('education/create', {
                user_id: portfolioOwnerId,
                school,
                major,
                position
            });
            const educations = await Api.get(
                `educationlist/${portfolioOwnerId}`
            );
            setEducations([...educations.data]);
            setAddState(false);
        } catch (error) {
            throw new Error(error);
        }
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
            inputInfo={{
                school,
                major,
                position
            }}
            isSchoolEmpty={isSchoolEmpty}
            isMajorEmpty={isMajorEmpty}
        />
    );
};

export default EducationAddForm;
