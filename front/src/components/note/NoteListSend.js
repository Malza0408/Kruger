import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import * as Api from '../../api';

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
        <Card.Text as={Col} className="sendNote">
            <Card.Body
                style={{ cursor: 'pointer' }}
                // 수신 쪽지 상세 페이지로 이동
                onClick={() => navigate(`/note/sentNotes/${sendNote.id}`)}
            >
                <Card.Title>
                    {sendNote.toUser.name === '탈퇴한 회원' ? (
                        <Badge bg="secondary">탈퇴한 회원</Badge>
                    ) : (
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                // 수신자의 개인 페이지로 이동
                                navigate(`/users/${sendNote.toUser?.id}`);
                            }}
                        >
                            <strong>{sendNote.toUser.name}</strong>
                        </span>
                    )}
                    <span className="text-muted">
                        <small>에게 보낸 쪽지</small>
                    </span>
                </Card.Title>
                <Card.Title>
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
                    <Col className="text-end">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(e);
                            }}
                            className="descriptionButton"
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
