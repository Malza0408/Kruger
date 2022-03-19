import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const OriginalModal = ({ show, setShow, errMsg, handleClose }) => {
    const navigate = useNavigate();
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>회원가입 실패</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errMsg}</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => navigate('/login')}
                    >
                        로그인 하러 가기
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OriginalModal;
