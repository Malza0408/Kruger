import {
    Container,
    Form,
    Row,
    Col,
    Button,
    Card,
    Badge
} from 'react-bootstrap';
import * as Api from '../../api';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteListTake = ({ key, takeNote, setTakeNote }) => {
    const navigate = useNavigate();

    const handleRead = async () => {
        await Api.put(`takenNotes/${takeNote.id}`);
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        await Api.delete(`takenNotes/${takeNote.id}`);

        await Api.get(`takenNotelist`).then((res) => {
            setTakeNote(res.data);
        });
    };

    return (
        <Card.Text as={Col}>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>
                            <span>
                                <strong>{takeNote.fromUser.name}</strong>
                            </span>
                            <span className="text-muted">
                                <small>이(가) 보낸 쪽지</small>
                            </span>
                        </Card.Title>
                    </Col>
                    <Col>
                        <span className="text-muted">
                            {takeNote.check ? (
                                <Badge pill bg="secondary">
                                    읽음
                                </Badge>
                            ) : (
                                <Badge pill bg="success">
                                    읽지 않음
                                </Badge>
                            )}
                            <small>{takeNote.check}</small>
                        </span>
                    </Col>
                </Row>
                <Col>
                    <Card.Link
                        onClick={() => {
                            navigate(`/note/${takeNote.id}`);
                            handleRead();
                        }}
                    >
                        <span>
                            <strong>{takeNote.title}</strong>
                        </span>
                    </Card.Link>
                </Col>
                <Row>
                    <Col>
                        <Card.Text>
                            <span className="text-muted">
                                {takeNote.createdAt}
                            </span>
                        </Card.Text>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            size="sm"
                            className="mvpCardCancelButton"
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>{' '}
                    </Col>
                </Row>
                {/* <Card.Text>
                    <span className="text-muted">{takeNote.content}</span>
                </Card.Text> */}
            </Card.Body>
        </Card.Text>
    );
};

export default NoteListTake;
