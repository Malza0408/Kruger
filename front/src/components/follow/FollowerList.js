import React, { useState } from 'react';
import { Button, Offcanvas, Row, Col, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
const FollowingList = ({ user }) => {
    const navigate = useNavigate();
    const [followers, setFollowers] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        const res = await Api.get('user/current').then((res) =>
            setFollowers(res.data.follower)
        );
        setShow(true);
    };
    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                팔로워목록
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>나를 팔로우하는 사람</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        {followers.map((follower, i) => {
                            return (
                                <Row key={i} className="ms-3 mt-3">
                                    <Col>
                                        <Row>{follower.name}</Row>
                                        <Row>{follower.email}</Row>
                                    </Col>
                                    <Col>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                navigate(
                                                    `/users/${follower.id}`
                                                );
                                            }}
                                        >
                                            포트폴리오
                                        </Button>
                                    </Col>
                                </Row>
                            );
                        })}
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default FollowingList;
