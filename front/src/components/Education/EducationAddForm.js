import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import * as Api from '../../api';

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
        <Card>
            <Card.Body>
                <Card.Title>학력</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className='mb-3'
                        controlId='school.ControlInput'
                    >
                        <Form.Label>학교</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='OO대학교'
                            onChange={handleSchoolOnChange}
                        />
                        {!school && (
                            <Form.Text className='text-danget'>
                                학교를 작성 해 주세요.
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='major.ControlInput'>
                        <Form.Label>Major</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='OO전공'
                            onChange={handleMajorOnChange}
                        />
                        {!major && (
                            <Form.Text className='text-danget'>
                                전공을 작성 해 주세요.
                            </Form.Text>
                        )}
                        {/* name이 check 중복을 걸러줌 */}
                        <div key='inline-radio' className='mt-2'>
                            <Form.Check
                                inline
                                type='radio'
                                label='재학중'
                                id='radio-edit-1'
                                name='group1'
                                value='재학중'
                                onClick={handleCheckOnClick}
                            />
                            <Form.Check
                                inline
                                type='radio'
                                label='학사졸업'
                                id='radio-edit-2'
                                name='group1'
                                value='학사졸업'
                                onClick={handleCheckOnClick}
                            />
                            <Form.Check
                                inline
                                type='radio'
                                label='석사졸업'
                                id='radio-edit-3'
                                name='group1'
                                value='석사졸업'
                                onClick={handleCheckOnClick}
                            />
                            <Form.Check
                                inline
                                type='radio'
                                label='박사졸업'
                                id='radio-edit-4'
                                name='group1'
                                value='박사졸업'
                                onClick={handleCheckOnClick}
                            />
                        </div>
                    </Form.Group>
                    <Row className='text-center'>
                        <Col>
                            <Button
                                variant='primary'
                                type='submit'
                                className='me-3'
                            >
                                확인
                            </Button>
                            <Button variant='secondary' onClick={handleOnClick}>
                                취소
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default EducationAddForm;
