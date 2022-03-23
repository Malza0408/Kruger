import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import * as Api from '../../api';
import React, { useState, useEffect, useContext } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import NoteDescription from './NoteDescription';

const NoteListSend = ({ sendNote, setSendNote }) => {
    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());
    const [newDateFormatted, setNewDateFormatted] = useState('');

    useEffect(() => {
        setDate(new Date(sendNote.createdAt));
        const time = new Date(sendNote.createdAt)
            .toLocaleString()
            .split('.')[3];

        // date format을 'yyyy-MM-dd'로 변경
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        setNewDateFormatted(`${year}년 ${month}월 ${day}일 ${time}`);
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        await Api.delete(`sentNotes/${sendNote.id}`);

        await Api.get(`sentNotelist`).then((res) => {
            setSendNote(res.data);
        });
    };

    return (
        <Card.Text as={Col}>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>
                            <span>
                                <strong>{sendNote.toUser.name}</strong>
                            </span>
                            <span className="text-muted">
                                <small>에게 보낸 쪽지</small>
                            </span>
                        </Card.Title>
                    </Col>
                </Row>
                <Col>
                    <Card.Link onClick={() => navigate(`/note/${sendNote.id}`)}>
                        <span className="fs-5">
                            <strong>{sendNote.title}</strong>
                        </span>
                    </Card.Link>
                </Col>
                <Row>
                    <Col>
                        <Card.Text>
                            <span className="text-muted">
                                <small>{newDateFormatted}</small>
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
            </Card.Body>
        </Card.Text>
    );
};

export default NoteListSend;
