import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    Container,
    Accordion,
    Card,
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';

import * as Api from '../../api';

const NoteWriteForm = () => {
    const navigate = useNavigate();
    const [to, setTo] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [friend, setFriend] = useState([]);
    const [searchFriend, setSearchFriend] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [isToEmpty, setIsToEmpty] = useState(false);
    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isContentEmpty, setIsContentEmpty] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // to 공란이면 true
        setIsToEmpty(!to);
        // title 공란이면 true
        setIsTitleEmpty(!title);
        // content 공란이면 true
        setIsContentEmpty(!content);

        try {
            !(isToEmpty && isTitleEmpty && isContentEmpty) &&
                (await Api.post('note/create', {
                    to,
                    title,
                    content
                }));
            navigate('/note');
        } catch (err) {
            console.log('전송 실패', err);
        }
    };

    return (
        <Container fluid>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formNoteTo">
                            <Form.Label>
                                <span>
                                    <strong>받는 사람</strong>
                                </span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={to}
                                placeholder="이메일을 입력하세요"
                                onChange={(e) => setTo(e.target.value)}
                            />
                            {isToEmpty && (
                                <Form.Text className="text-success">
                                    받는 사람을 입력해주세요
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Col>
                            {/* 친구 검색창 */}
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <strong>친구 목록</strong>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formNoteFriend"
                                        >
                                            <Form.Label>친구</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={to}
                                                onChange={(e) =>
                                                    setTo(e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                        {/* 친구 목록 */}
                                        <Row
                                            xs="auto"
                                            className="jusify-content-center"
                                        >
                                            {searchFriend?.length === 0 &&
                                            inputValue === ''
                                                ? friend.map((friend) => (
                                                      //   <UserCard key={user.id} user={user} isNetwork />
                                                      <Row>{friend}</Row>
                                                  ))
                                                : searchFriend.map((friend) => (
                                                      //   <UserCard key={user.id} user={user} isNetwork />
                                                      <Row>{friend}</Row>
                                                  ))}
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>

                        <Form.Group className="mb-3" controlId="formNoteTitle">
                            <Form.Label>
                                <strong>제목</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {isTitleEmpty && (
                                <Form.Text className="text-success">
                                    제목을 입력해주세요
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formNoteDescription"
                        >
                            <Form.Label>
                                <strong>내용</strong>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={9}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            {isContentEmpty && (
                                <Form.Text className="text-success">
                                    내용을 입력해주세요
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Button
                            variant="primary"
                            value="전송"
                            className="me-3"
                            onClick={handleSubmit}
                        >
                            전송
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NoteWriteForm;
