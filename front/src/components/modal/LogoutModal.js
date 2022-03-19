import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const LogoutModal = ({ show, msg, handleClose, logoutConfirm }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>로그아웃</Modal.Title>
                </Modal.Header>
                <Modal.Body>{msg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={logoutConfirm}>
                        로그아웃
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LogoutModal;
