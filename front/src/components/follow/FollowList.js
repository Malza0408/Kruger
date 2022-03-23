import React, { useState } from 'react';
import { Button, Offcanvas, Row, Col, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
const FollowingList = ({ user }) => {
    const navigate = useNavigate();
    const [follows, setFollows] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        const res = await Api.get('user/current').then((res) =>
            setFollows(res.data.follow)
        );
        setShow(true);
    };
    const handleUnfollow = async (follow) => {
        const followedId = follow.id;
        const user_id = user.id;
        await Api.put(`unfollowUser/${follow.id}`, {
            followedId,
            user_id
        });
        await Api.get('user/current').then((res) =>
            setFollows([...res.data.follow])
        );
        alert('언팔로우하셨습니다.');
    };
    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                팔로우목록
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>내가 팔로우하는 사람</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        {follows.map((follow, i) => {
                            return (
                                <Row key={i} className="ms-3 mt-3">
                                    <Col>
                                        <Row>{follow.name}</Row>
                                        <Row>{follow.email}</Row>
                                    </Col>
                                    <Col>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                navigate(`/users/${follow.id}`);
                                            }}
                                        >
                                            포트폴리오
                                        </Button>

                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                handleUnfollow(follow);
                                            }}
                                        >
                                            언팔로우
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
