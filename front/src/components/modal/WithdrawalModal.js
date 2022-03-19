import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const WithdrawalModal = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>회원 탈퇴</Modal.Title>
                </Modal.Header>
                <Modal.Body>회원을 탈퇴하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">확인</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default WithdrawalModal;
