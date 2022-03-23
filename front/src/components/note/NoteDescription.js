import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import * as Api from '../../api';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteDescription = () => {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [note, setNote] = useState('');

    useEffect(() => {
        Api.get(`user/current`).then((res) => setUser(res.data));
    }, []);

    useEffect(() => {
        Api.get(`sentNotes/${params.noteId}`).then((res) => {
            setNote(res.data);
        });
    }, [params]);

    return (
        <>
            <Card.Text as={Col}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>
                                <span>
                                    {user?.name === note.fromUser?.name ? ( // 발신
                                        <span>
                                            <strong>{note.toUser?.name}</strong>
                                            <span className="text-muted">
                                                <small>에게 보낸 쪽지</small>
                                            </span>
                                        </span>
                                    ) : (
                                        // 수신
                                        <span>
                                            <strong>
                                                {note.fromUser?.name}
                                            </strong>
                                            <span className="text-muted">
                                                <small>가 보낸 쪽지</small>
                                            </span>
                                        </span>
                                    )}
                                    {/* <strong>{user?.name}</strong> */}
                                </span>

                                {/* <span className="text-muted">
                                    <small>가 </small>
                                </span>
                                <span>
                                    <strong>{note.toUser?.name}</strong>
                                </span>

                                <span className="text-muted">
                                    <small>에게 보낸 쪽지</small>
                                </span> */}
                            </Card.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span>
                                <strong>{note.title}</strong>
                            </span>
                        </Col>
                    </Row>
                    <Card.Text>
                        <span className="text-muted">{note.content}</span>
                    </Card.Text>
                    <Col>
                        <Card.Text>
                            <span className="text-muted">{note.createdAt}</span>
                        </Card.Text>
                    </Col>
                </Card.Body>
            </Card.Text>
        </>
    );
};

export default NoteDescription;
