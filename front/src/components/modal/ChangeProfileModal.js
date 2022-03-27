import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as Api from '../../api';
const ChangeProfileModal = ({ show, handleClose, user, setUser }) => {
    const [url, setUrl] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = user.id;
        await Api.put(`user/current`, {
            user_id,
            picture: url
        }).then();
        await Api.get('users', user_id).then((res) => setUser(res.data));
        handleClose();
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                className="changeProfileModal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>프로필 사진 변경</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="school.ControlInput"
                        >
                            <Form.Label>URL을 입력해주세요.</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="http://placekitten.com/200/200"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            type="submit"
                            className="changeButton"
                        >
                            변경
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

export default ChangeProfileModal;
