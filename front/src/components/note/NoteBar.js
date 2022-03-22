import React, { useState } from 'react';
import { Container, Accordion, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import NoteWriteForm from './NoteWriteForm'

const NoteBar = ({
    isWriting,
    setIsWritingis,
    NoteListAll,
    setIsNoteListAll,
    isNoteListSendig,
    setIsNoteListSending
}) => {
    const navigate = useNavigate();
    return (
        <Row>
            <Col>
                <Button
                    variant="primary"
                    value="전체"
                    className="me-3"
                    onClick={() => setIsNoteListAll(true)}
                >
                    전체
                </Button>
            </Col>
            <Col>
                <Button
                    variant="primary"
                    value="발신"
                    className="me-3"
                    onClick={() => {
                        setIsNoteListSending(true);
                        setIsNoteListAll(false);
                    }}
                >
                    발신함
                </Button>
            </Col>
            <Col>
                <Button
                    variant="primary"
                    value="발신"
                    className="me-3"
                    onClick={() => {
                        setIsNoteListSending(false);
                        setIsNoteListAll(false);
                    }}
                >
                    수신함
                </Button>
            </Col>
            <Col>
                <Button
                    variant="primary"
                    value="전송"
                    className="me-3"
                    onClick={() => navigate('/note/write')}
                >
                    쪽지 작성
                </Button>
            </Col>
        </Row>
    );
};

export default NoteBar;
