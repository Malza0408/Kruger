import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

import * as Api from '../../api';

const AwardAddForm = ({ setIsAdding, portfolioOwnerId, setAwards }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

    const handleSubmit = async (e) => {
        // 데이터를 추가하기
        e.preventDefault();
        const user_id = portfolioOwnerId;
        // title 공란이면 true
        setIsTitleEmpty(!title);
        // description 공란이면 true
        setIsDescriptionEmpty(!description);

        await Api.post(`award/create`, {
            user_id: portfolioOwnerId,
            title,
            description
        });

        await Api.get(`awardlist`, user_id).then((res) => setAwards(res.data));
        setIsAdding(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="awardAddTitle">
                <Form.Control
                    type="text"
                    placeholder="수상내역"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                {isTitleEmpty && (
                    <Form.Text className="text-success">
                        수상내역을 입력해주세요
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mt-3" controlId="awardAddDescription">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                {isDescriptionEmpty && (
                    <Form.Text className="text-success">
                        상세내역을 입력해주세요
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group as={Row} className="text-center mt-3">
                {(isTitleEmpty || isDescriptionEmpty) && (
                    <Form.Text className="text-success">
                        빠짐 없이 입력해주세요
                    </Form.Text>
                )}
                <Col sm={{ span: 20 }}>
                    <Button
                        className="me-3 mvpCardConfirmButton"
                        variant="primary"
                        type="submit"
                    >
                        확인
                    </Button>
                    <Button
                        className="mvpCardCancelButton"
                        variant="secondary"
                        type="button"
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
