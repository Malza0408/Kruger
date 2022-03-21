import React, { useState } from 'react';
import { NavDropdown, Card, Navbar, Nav, Container } from 'react-bootstrap';

const FriendsCard = () => {
    const [friends, setFriends] = useState([
        '뽀로로',
        '크롱',
        '포비',
        '루피',
        '에디'
    ]);
    return (
        <Card style={{ width: '18rem' }} className="mb-2 ms-3 mr-5 FriendsCard">
            <Card.Header className="text-center">친구 목록</Card.Header>
            <Card.Body className="text-algin-left">
                {friends.map((friend, i) => {
                    return (
                        <Navbar className="navbarWrap" expand="lg">
                            <Container>
                                <Navbar.Brand>
                                    {i + 1}. {friend}
                                </Navbar.Brand>
                                <Nav>
                                    <Nav.Item>
                                        <Nav.Link>쪽지</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link>친구삭제</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Container>
                        </Navbar>
                    );
                })}
            </Card.Body>
        </Card>
    );
};

export default FriendsCard;
