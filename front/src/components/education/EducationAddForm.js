import React, { useState } from 'react';
import * as Api from '../../api';
import DefaultForm from './DefaultForm';

const EducationAddForm = ({ setAddState, setEducations, portfolioOwnerId }) => {
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [position, setPosition] = useState('재학중');

    const [isSchoolEmpty, setIsSchoolEmpty] = useState(false);
    const [isMajorEmpty, setIsMajorEmpty] = useState(false);

    const handleOnChange = (e) => {
        const id = e.target.id;
        switch (id) {
            case 'school': {
                setSchool(e.target.value);
                break;
            }
            case 'major': {
                setMajor(e.target.value);
                break;
            }
            case 'radio': {
                setPosition(e.target.value);
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // school 공란이면 true
            setIsSchoolEmpty(!school);
            // major 공란이면 true
            setIsMajorEmpty(!major);

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
            handleOnChange={handleOnChange}
            school={school}
            major={major}
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
