import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const WithdrawalModal = ({ show, handleClose, userDelete }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} className="withdrawalModal">
                <Modal.Header closeButton>
                    <Modal.Title>회원 탈퇴</Modal.Title>
                </Modal.Header>
                <Modal.Body>회원을 탈퇴하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={userDelete}
                        className="confirmButton"
                    >
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        className="cancelButton"
                    >
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default WithdrawalModal;
