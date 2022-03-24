import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import NoteFollow from './NoteFollow';

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

    const [user, setUser] = useState(null);

    const [isToEmpty, setIsToEmpty] = useState(false);
    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isContentEmpty, setIsContentEmpty] = useState(false);
    const [isToMe, setIsToMe] = useState(false);

    useEffect(() => {
        Api.get(`user/current`).then((res) => setUser(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // to 공란이면 true
        setIsToEmpty(!to);
        // title 공란이면 true
        setIsTitleEmpty(!title);
        // content 공란이면 true
        setIsContentEmpty(!content);
        //본인을 수신자로 선택했으면 true
        setIsToMe(user.email === to);

        try {
            // 하나라도 공란이며, 본인이 수신자이면 post 불가
            !(!to || !title || !content) &&
                !(user.email === to) &&
                (await Api.post('note/create', {
                    to,
                    title,
                    content
                })) &&
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
                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formNoteTo"
                                >
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
                                    {isToMe && (
                                        <Form.Text className="text-success">
                                            본인에게 쪽지를 전송할 수 없습니다
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col>
                                {/* 팔로우 */}
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            <strong>팔로우 목록</strong>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {/* 팔로우 검색창 */}
                                            {/* <Form.Group
                                                className="mb-3"
                                                controlId="formNoteFriend"
                                            >
                                                <Form.Label>팔로우</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={to}
                                                    placeholder="팔로우를 검색하세요"
                                                    onChange={(e) =>
                                                        setTo(e.target.value)
                                                    }
                                                />
                                            </Form.Group> */}
                                            {/* 팔로우 목록 */}
                                            <Col
                                                xs="auto"
                                                className="jusify-content-center"
                                            >
                                                {user?.follow.length === 0 ? (
                                                    <span>
                                                        팔로우가 없습니다
                                                    </span>
                                                ) : (
                                                    user?.follow.map(
                                                        (follow) => {
                                                            return (
                                                                <NoteFollow
                                                                    key={
                                                                        follow.id
                                                                    }
                                                                    follow={
                                                                        follow
                                                                    }
                                                                    setTo={
                                                                        setTo
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    )
                                                )}
                                            </Col>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                        </Row>
                        <br />
                        <hr />
                        <br />
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
