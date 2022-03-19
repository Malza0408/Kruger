import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function UserEditForm({ user, setIsEditing, setUser }) {
    //useState로 name 상태를 생성함.
    const [name, setName] = useState(user.name);
    //useState로 email 상태를 생성함.
    const [email, setEmail] = useState(user.email);
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState(user.description);

    // useState로 mouse over 상태를 생성함.
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // "users/유저id" 엔드포인트로 PUT 요청함.
        const res = await Api.put(`users/${user.id}`, {
            name,
            email,
            description
        });
        // 유저 정보는 response의 data임.
        const updatedUser = res.data;
        // 해당 유저 정보로 user을 세팅함.
        setUser(updatedUser);

        // isEditing을 false로 세팅함.
        setIsEditing(false);
    };

    return (
        <Card className="mb-2">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="useEditName" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="이름"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Card.Subtitle
                                className="mb-2 text-muted"
                                onMouseOver={() => {
                                    setIsMouseOver(true);
                                }}
                                onMouseOut={() => {
                                    setIsMouseOver(false);
                                }}
                            >
                                {user?.email}
                            </Card.Subtitle>
                        </Col>
                        <Col>
                            {isMouseOver && (
                                <Card.Subtitle className="text-primary">
                                    수정 불가 항목입니다.
                                </Card.Subtitle>
                            )}
                        </Col>
                    </Row>
                    <Form.Group controlId="userEditDescription">
                        <Form.Control
                            type="text"
                            placeholder="정보, 인사말"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Row} className="mt-3 text-center">
                        <Col sm={{ span: 20 }}>
                            <Button
                                variant="primary"
                                type="submit"
                                className="me-3"
                            >
                                확인
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                취소
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default UserEditForm;
