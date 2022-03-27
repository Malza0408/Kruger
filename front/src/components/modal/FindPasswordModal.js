import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as Api from '../../api';
const FindPasswordModal = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        await Api.put('user/resetPassword', {
            email
        });
        alert('이메일로 임시 비밀번호가 전송되었습니다.');
        handleClose();
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                className="findPasswordModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>비밀번호 찾기</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="school.ControlInput"
                        >
                            <Form.Label>이메일을 입력해주세요.</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            type="submit"
                            className="sendButton"
                        >
                            전송
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            className="cancelButton"
                        >
                            취소
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default FindPasswordModal;
