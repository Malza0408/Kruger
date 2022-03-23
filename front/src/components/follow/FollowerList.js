import React, { useState } from 'react';
import { Button, Offcanvas, Navbar, Container, Nav } from 'react-bootstrap';

const FollowList = ({ followers }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 나를 팔로우하는 사람

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                팔로워 목록
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>나를 팔로우하는 사람</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {followers.map((follower, i) => {
                        return (
                            <div key={i}>
                                <Navbar expand="lg" className="friendCard py-0">
                                    <Container>
                                        <Nav>
                                            {i + 1}. {follower}
                                        </Nav>
                                        <Nav>
                                            <Nav.Item>
                                                <Nav.Link>쪽지</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link onClick={() => {}}>
                                                    친구삭제
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Container>
                                </Navbar>
                            </div>
                        );
                    })}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default FollowList;
