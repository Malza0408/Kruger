import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as Api from '../../api';
const ChangeProfileModal = ({ show, handleClose, user }) => {
    const [img, setImg] = useState('');
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log('user', user);
    //     await Api.put(`users/${user.id}`, {
    //         picture: { img }
    //     });
    // };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>프로필 사진 변경</Modal.Title>
                </Modal.Header>
                <Form onSubmit={() => {}}>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="school.ControlInput"
                        >
                            <Form.Label>URL을 입력해주세요.</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="http://placekitten.com/200/200"
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            변경
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default ChangeProfileModal;
