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
import NoteDescription from './NoteDescription';

const NoteListSend = ({ sendNote, setSendNote }) => {
    const navigate = useNavigate();
    const [newDateFormatted, setNewDateFormatted] = useState('');

    useEffect(() => {
        const newDate = new Date(sendNote?.createdAt);

        // date format을 'yyyy년 MM월 dd일 h:m:s'로 변경
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        const time = newDate.toLocaleString().split('.')[3];

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
                <Card.Title>
                    {sendNote.toUser.name === '탈퇴한 회원' ? (
                        <Badge bg="secondary">탈퇴한 회원</Badge>
                    ) : (
                        <span>
                            <strong>{sendNote.toUser.name}</strong>
                        </span>
                    )}
                    <span className="text-muted">
                        <small>에게 보낸 쪽지</small>
                    </span>
                </Card.Title>
                <Card.Title
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/note/${sendNote.id}`)}
                >
                    <span className="fs-5">
                        <strong>{sendNote.title}</strong>
                    </span>
                </Card.Title>
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
            <hr />
        </Card.Text>
    );
};

export default NoteListSend;
