import { Row, Col, Button, Card, Badge } from 'react-bootstrap';
import * as Api from '../../api';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteListTake = ({ takeNote, setTakeNote }) => {
    const navigate = useNavigate();
    const [newDateFormatted, setNewDateFormatted] = useState('');

    useEffect(() => {
        const newDate = new Date(takeNote?.createdAt);

        // date format을 'yyyy년 MM월 dd일 h:m:s'로 변경
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        const time = newDate.toLocaleString().split('.')[3];

        setNewDateFormatted(`${year}년 ${month}월 ${day}일 ${time}`);
    }, []);

    const handleRead = async () => {
        await Api.patch(`takenNotes/${takeNote.id}`);
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
                            {takeNote.fromUser.name === '탈퇴한 회원' ? (
                                <Badge bg="secondary">탈퇴한 회원</Badge>
                            ) : (
                                <span>
                                    <strong>{takeNote.fromUser.name}</strong>
                                </span>
                            )}
                            <span className="text-muted">
                                <small>이(가) 보낸 쪽지</small>
                            </span>
                        </Card.Title>
                    </Col>
                    <Col>
                        {takeNote.check ? (
                            <Badge pill bg="secondary">
                                읽음
                            </Badge>
                        ) : (
                            <Badge pill bg="success">
                                읽지 않음
                            </Badge>
                        )}
                    </Col>
                </Row>
                <Card.Title
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        navigate(`/note/${takeNote.id}`);
                        handleRead();
                    }}
                >
                    <span className="fs-5">
                        <strong>{takeNote.title}</strong>
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
                {/* <Card.Text>
                    <span className="text-muted">{takeNote.content}</span>
                </Card.Text> */}
            </Card.Body>
            <hr />
        </Card.Text>
    );
};

export default NoteListTake;
