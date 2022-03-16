import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import EducationForm from './EducationForm';
const EducationBody = ({ portfolioOwnerId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [schoolInput, setSchoolInput] = useState('');
    const [majorInput, setMajorInput] = useState('');
    const [radioValue, setRadioValue] = useState('');
    // 학교 이름 값이 들어간다.
    const [schoolName, setSchoolName] = useState('');
    // 전공 이름 값이 들어간다.
    const [majorName, setMajorName] = useState('');
    // 재학중인지, 졸업인지의 값이 들어간다.
    const [schoolState, setSchoolState] = useState('');

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
        setRadioValue(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // 칸을 비워놨다면 값을 받지 않는다.
        if (schoolInput && majorInput && radioValue) {
            setIsEditing(false);
            setSchoolName(schoolInput);
            setMajorName(majorInput);
            setSchoolState(radioValue);
            setSchoolInput('');
            setMajorInput('');
        }
    };
    return (
        <>
            {/* 편집중이라면 Form을, 그렇지 않다면 메인 학력창을 보여준다. */}
            {isEditing ? (
                <EducationForm
                    handleSchoolOnChange={handleSchoolOnChange}
                    handleMajorOnChange={handleMajorOnChange}
                    schoolInput={schoolInput}
                    majorInput={majorInput}
                    handleCheckOnClick={handleCheckOnClick}
                    handleSubmit={handleSubmit}
                    handleEditing={handleEditing}
                    portfolioOwnerId={portfolioOwnerId}
                />
            ) : (
                <>
                    <Card.Title>학력</Card.Title>
                    <Card.Text className='mb-0'>
                        <Row className='align-items-center'>
                            <Col>
                                {schoolName ? (
                                    <span>{schoolName}</span>
                                ) : (
                                    <span>OO학교</span>
                                )}
                                <br />
                                {majorName ? (
                                    <>
                                        <span className='text-muted'>
                                            {majorName}{' '}
                                        </span>
                                        <span className='text-muted'>
                                            ({schoolState})
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className='text-muted'>
                                            OO전공{' '}
                                        </span>
                                        <span className='text-muted'>
                                            (재학중)
                                        </span>
                                    </>
                                )}
                            </Col>
                            <Col className='col-lg-1'>
                                <Button
                                    className=''
                                    variant='outline-info'
                                    size='sm'
                                    onClick={handleEditing}
                                >
                                    편집
                                </Button>
                            </Col>
                        </Row>
                    </Card.Text>
                    <hr></hr>
                </>
            )}
        </>
    );
};

export default EducationBody;
