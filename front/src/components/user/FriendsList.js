import React, { useState } from 'react';
import {
    Navbar,
    Nav,
    Container,
    Button,
    Offcanvas,
    Row,
    Col
} from 'react-bootstrap';

const FriendsList = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [friends, setFriends] = useState([
        '뽀로로',
        '엘리스',
        '엘리',
        '루피',
        '승주님'
    ]);
    return (
        <Row style={{ width: '18rem' }} className="mb-2 ms-3 mr-5 text-center">
            <Col>
                <Button variant="secondary" onClick={handleShow}>
                    친구 목록
                </Button>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>친구 목록</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {friends.map((friend, i) => {
                            return (
                                <div key={i}>
                                    <Navbar
                                        expand="lg"
                                        className="friendCard py-0"
                                    >
                                        <Container>
                                            <Nav>
                                                {i + 1}. {friend}
                                            </Nav>
                                            <Nav>
                                                <Nav.Item>
                                                    <Nav.Link>쪽지</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link
                                                        onClick={() => {
                                                            const newFriends = [
                                                                ...friends
                                                            ];
                                                            newFriends.splice(
                                                                i,
                                                                1
                                                            );
                                                            setFriends(
                                                                newFriends
                                                            );
                                                        }}
                                                    >
                                                        친구삭제
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Container>
                                    </Navbar>
                                </div>
                            );
                        })}
                        <div className="text-center">
                            <Button
                                onClick={() => {
                                    setFriends([...friends, '고양이']);
                                }}
                            >
                                랜덤 친구 추가
                            </Button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </Col>
        </Row>
    );
};

export default FriendsList;
