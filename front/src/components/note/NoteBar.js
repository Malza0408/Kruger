import React, { useState } from 'react';
import {
    Container,
    Accordion,
    Form,
    Row,
    Col,
    Button,
    ButtonGroup,
    ButtonToolbar
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import NoteWriteForm from './NoteWriteForm';

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
        <Container>
            <ButtonToolbar className="justify-content-between mb-3">
                <ButtonGroup>
                    <Button
                        variant="light"
                        value="전체"
                        onClick={() => setIsNoteListAll(true)}
                        className="filterButton"
                    >
                        전체
                    </Button>
                    <Button
                        variant="light"
                        value="발신"
                        onClick={() => {
                            setIsNoteListSending(true);
                            setIsNoteListAll(false);
                        }}
                        className="filterButton"
                    >
                        발신함
                    </Button>
                    <Button
                        variant="light"
                        value="수신"
                        onClick={() => {
                            setIsNoteListSending(false);
                            setIsNoteListAll(false);
                        }}
                        className="filterButton"
                    >
                        수신함
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button
                        variant="light"
                        value="전송"
                        onClick={() => navigate('/note/write')}
                        className="filterButton"
                    >
                        쪽지 작성
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        </Container>
    );
};

export default NoteBar;
