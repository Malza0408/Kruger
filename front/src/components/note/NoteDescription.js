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

        !user &&
            Api.get(`takenNotes/${params.noteId}`).then((res) => {
                setNote(res.data);
            });
    }, [params, user]);

    return (
        <>
            <Card.Text as={Col}>
                <Card.Body>
                    <Card.Title>
                        {user?.name === note.fromUser?.name ? (
                            // 발신
                            <span>
                                <strong>{note.toUser?.name}</strong>
                                <span className="text-muted">
                                    <small>에게 보낸 쪽지</small>
                                </span>
                            </span>
                        ) : (
                            // 수신
                            <span>
                                <strong>{note.fromUser?.name}</strong>
                                <span className="text-muted">
                                    <small>가 보낸 쪽지</small>
                                </span>
                            </span>
                        )}
                    </Card.Title>
                    <Card.Title>
                        <span>
                            <strong>{note.title}</strong>
                        </span>
                    </Card.Title>
                    <Card.Text>
                        <span className="text-muted">{note.content}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className="text-muted">{note.createdAt}</span>
                    </Card.Text>
                </Card.Body>
            </Card.Text>
        </>
    );
};

export default NoteDescription;
