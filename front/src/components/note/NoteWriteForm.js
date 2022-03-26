import React, { useState, useEffect } from 'react';
import {
    Container,
    Accordion,
    Card,
    Form,
    Row,
    Col,
    Button,
    Badge
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import * as Api from '../../api';

import NoteFollow from './NoteFollow';

const NoteWriteForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [name, setName] = useState('');
    const [user, setUser] = useState(null);

    const [to, setTo] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [isToEmpty, setIsToEmpty] = useState(false);
    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isContentEmpty, setIsContentEmpty] = useState(false);
    const [isToMe, setIsToMe] = useState(false);
    const [isExistent, setIsExistent] = useState(true);

    useEffect(() => {
        Api.get(`user/current`).then((res) => setUser(res.data));

        // 답장 작성이라면 이전 쪽지의 발신자를 수신자로 설정
        !(`${params.replyTo}` === 'undefined') && setTo(`${params.replyTo}`);
    }, []);

    // 답장 작성이라면 수신자 란 수정할 수 없음
    const handelDisabled = () => {
        return `${params.replyTo}` === 'undefined' ? false : true;
    };

    // email input 시 해당 사용자의 이름 띄움
    const handleBlur = async (inputEmail) => {
        await Api.get('userlist')
            .then((res) => {
                return res.data.filter((user) => user.email === inputEmail);
            })
            .then((res) =>
                res === [] ? setName(null) : setName(res[0]?.name)
            );
    };

    const handleSubmit = async (e) => {
        const emailList = [];
        e.preventDefault();

        await Api.get('userlist').then((res) =>
            res.data.map((user) => emailList.push(user.email))
        );

        // 존재하는 이메일이라면 true
        setIsExistent(emailList.includes(to));
        // to 공란이면 true
        setIsToEmpty(!to);
        // title 공란이면 true
        setIsTitleEmpty(!title);
        // content 공란이면 true
        setIsContentEmpty(!content);
        //본인을 수신자로 선택했으면 true
        setIsToMe(user.email === to);

        try {
            // 하나라도 공란이며, 본인이 수신자이고, 존재하지 않는 수신자라면 post 불가
            !(!to || !title || !content) &&
                !(user.email === to) &&
                emailList.includes(to) &&
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
            <Card className="noteWriteForm">
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
                                    {/* email input 시 해당 사용자의 name 띄움 */}
                                    <Badge bg="secondary">{name}</Badge>
                                    <Form.Control
                                        type="text"
                                        value={to}
                                        placeholder="이메일을 입력하세요"
                                        disabled={handelDisabled()}
                                        onChange={(e) => setTo(e.target.value)}
                                        onBlur={(e) =>
                                            handleBlur(e.target.value)
                                        }
                                    />
                                    {isToEmpty && (
                                        <Form.Text className="text-success">
                                            받는 사람을 입력해주세요
                                        </Form.Text>
                                    )}
                                    {isToMe && (
                                        <Form.Text className="text-danger">
                                            본인에게 쪽지를 전송할 수 없습니다
                                        </Form.Text>
                                    )}
                                    {!isToEmpty && !isExistent && (
                                        <Form.Text className="text-danger">
                                            존재하지 않는 사용자 입니다
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col xs={1}></Col>
                            <Col>
                                {/* 팔로우 */}
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            <strong>팔로우 목록</strong>
                                        </Accordion.Header>
                                        <Accordion.Body>
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
                                                                    setName={
                                                                        setName
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
                        <Col className="text-center">
                            <Button
                                variant="primary"
                                value="전송"
                                onClick={handleSubmit}
                                className="descriptionButton me-2"
                            >
                                전송
                            </Button>
                            <Button
                                onClick={() => navigate('/note')}
                                className="descriptionButton"
                            >
                                취소
                            </Button>
                        </Col>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NoteWriteForm;
