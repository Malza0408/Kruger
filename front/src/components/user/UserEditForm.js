import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

import UpdatePassword from './UpdatePassword';

function UserEditForm({ user, setIsEditing, setUser }) {
    //useState로 name 상태를 생성함.
    const [name, setName] = useState(user.name);
    //useState로 email 상태를 생성함.
    const [email, setEmail] = useState(user.email);
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState(user.description);

    // useState로 mouse over 상태를 생성함.
    const [isMouseOver, setIsMouseOver] = useState(false);
    // 비밀번호 수정 modal
    const [modalShow, setModalShow] = React.useState(false);

    console.log(user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 현재 로그인 한 사용자의 정보를 수정
        const res = await Api.put(`user/current`, {
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
        <Card className="mb-2 userEditForm">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            className="mb-2 text-muted"
                            onMouseOver={() => {
                                setIsMouseOver(true);
                            }}
                            onMouseOut={() => {
                                setIsMouseOver(false);
                            }}
                            placeholder={user?.email}
                            disabled
                        />

                        <Row>
                            {isMouseOver && (
                                <Card.Subtitle className="text-primary">
                                    수정 불가 항목입니다.
                                </Card.Subtitle>
                            )}
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="useEditName" className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="이름"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
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
                                className="me-3 changePasswordButton"
                                onClick={() => setModalShow(true)}
                            >
                                비밀번호 변경
                            </Button>
                            <UpdatePassword
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                setModalShow={setModalShow}
                                user={user}
                            />
                            <Button
                                variant="primary"
                                type="submit"
                                className="me-3 confirmButton"
                            >
                                확인
                            </Button>
                            <Button
                                className="cancelButton"
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
