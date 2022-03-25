import React, { useState, useEffect } from 'react';
import {
    Container,
    Col,
    Button,
    Badge,
    Card,
    ButtonGroup,
    ButtonToolbar
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import * as Api from '../../api';

const NoteDescription = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [note, setNote] = useState('');
    const [newDateFormatted, setNewDateFormatted] = useState('');

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
        // 쪽지 작성 url 뒤에 답장할 수신자의 email을 붙임
        navigate(`/note/write/${note.fromUser?.email}`);
    };

    return (
        <Container fluid>
            <ButtonToolbar
                className="mb-3 noteDescription"
                aria-label="Toolbar with Button groups"
            >
                <ButtonGroup>
                    <Button
                        onClick={() => navigate('/note')}
                        className="descriptionButton"
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/img/back.png`}
                            alt="back"
                            width="20"
                            height="20"
                        ></img>
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleDelete}
                        className="descriptionButton"
                    >
                        삭제
                    </Button>
                    {/* 유효한 사용자가 전송한 수신 쪽지라면 답장 버튼 띄움 */}
                    {`${params.noteType}` === 'takenNotes' &&
                        !(note.fromUser?.name === '탈퇴한 회원') && (
                            <Button
                                variant="primary"
                                className="descriptionButton"
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
                                        <span
                                            className="fs-2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                // 수신자의 개인 페이지로 이동
                                                navigate(
                                                    `/users/${note.toUser?.id}`
                                                )
                                            }
                                        >
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
                                        <span
                                            className="fs-2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                // 발신자의 개인 페이지로 이동
                                                navigate(
                                                    `/users/${note.fromUser?.id}`
                                                )
                                            }
                                        >
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
                            <hr className="noteTitle" />
                        </span>
                    </Card.Title>
                    <Card.Text>
                        <pre className="fs-5 text-muted">{note.content}</pre>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NoteDescription;
