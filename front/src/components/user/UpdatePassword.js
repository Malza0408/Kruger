import React, { useState } from 'react';
import { Button, Form, Modal, Col, Row } from 'react-bootstrap';

import * as Api from '../../api';

import InputEmpty from '../InputEmpty';

function UpdatePassword({ show, onHide, setModalShow, user }) {
    console.log('dsfsdfsd');
    console.log(show, onHide);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isInputEmpty, setIsInputEmpty] = useState(false);

    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const isPasswordValid = password.length >= 4;
    // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
    const isPasswordSame = password === confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsInputEmpty(InputEmpty({ password, confirmPassword }));

        // "users/유저id" 엔드포인트로 PUT 요청함.
        await Api.put(`users/${user.id}`, {
            password
        });

        !(isPasswordValid && isPasswordSame) && setModalShow(true);
    };

    return (
        <Modal
            show={show}
            onhide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    비밀번호 변경
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="registerPassword" className="mt-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Row>
                            {!isPasswordValid && (
                                <Form.Text className="text-danger">
                                    비밀번호는 4글자 이상으로 설정해 주세요.
                                </Form.Text>
                            )}
                        </Row>
                        <Row>
                            {isInputEmpty.isPasswordEmpty && (
                                <Form.Text className="text-success">
                                    비밀번호를 입력해주세요
                                </Form.Text>
                            )}
                        </Row>
                    </Form.Group>
                    <Form.Group
                        controlId="registerConfirmPassword"
                        className="mt-3"
                    >
                        <Form.Label>비밀번호 재확인</Form.Label>
                        <Form.Control
                            type="password"
                            autoComplete="off"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Row>
                            {!isPasswordSame && (
                                <Form.Text className="text-danger">
                                    비밀번호가 일치하지 않습니다.
                                </Form.Text>
                            )}
                        </Row>
                        <Row>
                            {isInputEmpty.isConfirmPasswordEmpty && (
                                <Form.Text className="text-success">
                                    비밀번호를 입력해주세요
                                </Form.Text>
                            )}
                        </Row>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-5 mb-3 text-center">
                        <Col>
                            <Button variant="primary" onClick={handleSubmit}>
                                비밀번호 변경
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={{ show, onHide }.onHide}>
                                취소
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdatePassword;
