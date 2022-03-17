import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import * as Api from '../../api';

const AwardAddForm = ({ setIsAdding, portfolioOwnerId, setAwards }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        // 데이터를 추가하기
        e.preventDefault();
        const user_id = portfolioOwnerId;
        await Api.post(`award/create`, {
            user_id: portfolioOwnerId,
            title,
            description,
        });

        await Api.get(`awardlist`, user_id).then((res) => setAwards(res.data));
        setIsAdding(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='awardAddTitle'>
                <Form.Control
                    type='text'
                    placeholder='수상내역'
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group className='mt-3' controlId='awardAddDescription'>
                <Form.Control
                    type='text'
                    placeholder='상세내역'
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
            </Form.Group>
            <Form.Group as={Row} className='text-center mt-3'>
                <Col sm={{ span: 20 }}>
                    <Button className='me-3' variant='primary' type='submit'>
                        확인
                    </Button>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={() => {
                            setIsAdding(false);
                        }}
                    >
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default AwardAddForm;
