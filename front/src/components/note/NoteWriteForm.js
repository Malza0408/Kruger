import React, { useState } from 'react';
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

const NoteWriteForm = ({ isWriting, setIsWriting }) => {
    const [to, setTo] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [friend, setFriend] = useState([]);
    const [searchFriend, setSearchFriend] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isContentEmpty, setIsContentEmpty] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // title 공란이면 true
        setIsTitleEmpty(!title);
        // description 공란이면 true
        setIsContentEmpty(!content);

        try {
            const res = await Api.post('note/create', {
                to,
                title,
                content
            });

            console.log(res.data);
            setIsWriting(false);
        } catch (err) {
            console.log('전송 실패', err);
        }
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Col>
                        {/* 친구 검색창 */}
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>친구 목록</Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formnoteTo"
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

                    <Form.Group className="mb-3" controlId="formnoteTitle">
                        <Form.Label>제목</Form.Label>
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
                    <Form.Group className="mb-3" controlId="noteDescription">
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
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
    );
};

export default NoteWriteForm;
