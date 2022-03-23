import {
    Row,
    Col,
    Button,
    Card,
    Badge
} from 'react-bootstrap';
import * as Api from '../../api';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteListTake = ({ takeNote, setTakeNote }) => {
    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());
    const [newDateFormatted, setNewDateFormatted] = useState('');

    useEffect(() => {
        setDate(new Date(takeNote.createdAt));
        const time = new Date(takeNote.createdAt)
            .toLocaleString()
            .split('.')[3];

        // date format을 'yyyy-MM-dd'로 변경
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

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
                        <span className="fs-5">
                            <strong>{takeNote.title}</strong>
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
                {/* <Card.Text>
                    <span className="text-muted">{takeNote.content}</span>
                </Card.Text> */}
            </Card.Body>
        </Card.Text>
    );
};

export default NoteListTake;
