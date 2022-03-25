import React, { useState } from 'react';
import { Button, Offcanvas, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
const FollowingList = () => {
    const navigate = useNavigate();
    const [followers, setFollowers] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        await Api.get('user/current').then((res) =>
            setFollowers(res.data.follower)
        );
        setShow(true);
    };
    return (
        <>
            <Button
                variant="light"
                onClick={handleShow}
                className="followerList"
            >
                팔로워목록
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header
                    style={{ backgroundColor: '#fff5f5' }}
                    closeButton
                >
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
                                            variant="light"
                                            size="sm"
                                            onClick={() => {
                                                navigate(
                                                    `/note/write/${follower.email}`
                                                );
                                            }}
                                            className="optionButton"
                                        >
                                            쪽지
                                        </Button>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            onClick={() => {
                                                alert(
                                                    '포트폴리오로 이동합니다.'
                                                );
                                                navigate(
                                                    `/users/${follower.id}`
                                                );
                                            }}
                                            className="optionButton"
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
