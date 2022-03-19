import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ChangeProfileModal = ({ show, handleClose, setImgUrl }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>프로필 사진 변경</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={() => {}}>
                        <Form.Group
                            className="mb-3"
                            controlId="school.ControlInput"
                        >
                            <Form.Label>URL을 입력해주세요.</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="http://placekitten.com/200/200"
                                onChange={(e) => setImgUrl(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        변경
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ChangeProfileModal;
