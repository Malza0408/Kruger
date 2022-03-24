import {
    Container,
    Form,
    Row,
    Col,
    Button,
    Badge,
    Card,
    ButtonGroup,
    ButtonToolbar
} from 'react-bootstrap';
import * as Api from '../../api';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import NoteWriteForm from './NoteWriteForm';

const NoteDescription = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState(true);
    const [note, setNote] = useState('');
    const [newDateFormatted, setNewDateFormatted] = useState('');

    useEffect(() => {
        Api.get(`user/current`).then((res) => setUser(res.data));
    }, []);

    useEffect(() => {
        Api.get(`${params.noteType}/${params.noteId}`).then((res) => {
            setNote(res.data);
        });

    }, [params]);

    useEffect(() => {
        const newDate = new Date(note?.createdAt);

        // date format을 'yyyy년 MM월 dd일 h:m:s'로 변경
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        const time = newDate.toLocaleString().split('.')[3];

        setNewDateFormatted(`${year}년 ${month}월 ${day}일 ${time}`);
    }, [note]);

    const handleDelete = async (e) => {
        e.preventDefault();

        await Api.delete(`${params.noteType}/${params.noteId}`);

        navigate('/note');
    };

    const reply = () => {
            navigate(`/note/write/${note.fromUser?.email}`)
    };

    return (
        <Container fluid>
            <ButtonToolbar
                className="mb-3"
                aria-label="Toolbar with Button groups"
            >
                <ButtonGroup>
                    <Button
                        onClick={() => navigate('/note')}
                        className="descriptionButton"
                    >
                        쪽지함으로 돌아가기
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleDelete}
                        className="descriptionButton"
                    >
                        삭제
                    </Button>
                    {`${params.noteType}` === 'takenNotes' && (
                        <Button
                            variant="primary"
                            size="sm"
                            className="noteDescriptionButton"
                            onClick={reply}
                        >
                            답장
                        </Button>
                    )}
                </ButtonGroup>
            </ButtonToolbar>
            <Card className="descriptionCard">
                <Card.Body>
                    <Card.Title>
                        {`${params.noteType}` === 'sentNotes' ? (
                            // 발신
                            <Col>
                                <h3>
                                    {note.toUser?.name === '탈퇴한 회원' ? (
                                        <Badge bg="secondary">
                                            탈퇴한 회원
                                        </Badge>
                                    ) : (
                                        <span className="fs-2">
                                            <strong>{note.toUser?.name}</strong>
                                        </span>
                                    )}
                                    <span className="text-muted">
                                        <small>에게 보낸 쪽지</small>
                                    </span>
                                </h3>
                                <span className="text-muted">
                                    <small>{note.toUser?.email}</small>
                                </span>
                            </Col>
                        ) : (
                            // 수신
                            <Col>
                                <h3>
                                    {note.fromUser?.name === '탈퇴한 회원' ? (
                                        <Badge bg="secondary">
                                            탈퇴한 회원
                                        </Badge>
                                    ) : (
                                        <span className="fs-2">
                                            <strong>
                                                {note.fromUser?.name}
                                            </strong>
                                        </span>
                                    )}
                                    <span className="text-muted">
                                        <small>이(가) 보낸 쪽지</small>
                                    </span>
                                </h3>
                                <span className="text-muted">
                                    <small>{note.fromUser?.email}</small>
                                </span>
                            </Col>
                        )}
                        <Card.Text>
                            <span className="fs-6 text-muted">
                                {newDateFormatted}
                            </span>
                        </Card.Text>
                    </Card.Title>
                    <br />
                    <Card.Title>
                        <span className="fs-4">
                            <strong>{note.title}</strong>
                        </span>
                    </Card.Title>
                    <Card.Text>
                        <span className="fs-5 text-muted">{note.content}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NoteDescription;
