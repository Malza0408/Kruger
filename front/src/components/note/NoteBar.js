import React, { useState } from 'react';
import { Container, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NoteBar = ({
    setIsNoteListAll,
    setIsNoteListSending,
    isNoteRefreshed,
    setIsNoteRefreshed
}) => {
    const navigate = useNavigate();

    return (
        <Container fluid>
            <ButtonToolbar className="justify-content-between mb-3 noteBar">
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
                        onClick={() => setIsNoteRefreshed(!isNoteRefreshed)}
                        className="writeNoteButton"
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/img/refresh.png`}
                            alt="refresh"
                            width="20"
                            height="20"
                        ></img>
                    </Button>
                    <Button
                        variant="light"
                        value="전송"
                        onClick={() => navigate('/note/write')}
                        className="writeNoteButton"
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/img/edit (1).png`}
                            alt="write"
                            width="17"
                            height="17"
                        ></img>
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
        </Container>
    );
};

export default NoteBar;
