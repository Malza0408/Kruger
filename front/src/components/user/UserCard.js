import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import WithdrawalModal from '../modal/WithdrawalModal';
import ChangeProfileModal from '../modal/ChangeProfileModal';

import * as Api from '../../api';

function UserCard({ user, setUser, setIsEditing, isEditable, isNetwork }) {
    const params = useParams();
    const navigate = useNavigate();
    //프로필 변경 모달
    const [showProfile, setShowProfile] = useState(false);
    const handleCloseProfile = () => setShowProfile(false);
    const handleShowProfile = () => setShowProfile(true);
    // 회원 탈퇴 모달
    const [showWithdrawal, setShowWithdrawal] = useState(false);
    const handleCloseWithdrawal = () => setShowWithdrawal(false);
    const handleShowWithdrawal = () => setShowWithdrawal(true);

    const userDelete = async (e) => {
        e.preventDefault();

        // 현재 로그인한 사용자를 삭제
        await Api.delete(`user/current`);

        // 탈퇴 후 로그인 화면으로 이동
        navigate('/login', { replace: true });
    };

    return (
        <Card style={{ width: '20rem' }} className="mb-3 mx-auto userCard">
            <Card.Body>
                <Row className="justify-content-md-center">
                    <img
                        className="mb-3 mt-3 profileImage"
                        src={user?.picture}
                        alt="프로필 사진"
                        onClick={() => navigate(`/users/${user.id}`)}
                    />
                    <ChangeProfileModal
                        show={showProfile}
                        handleClose={handleCloseProfile}
                        user={user}
                        setUser={setUser}
                    />
                </Row>
                <Card.Title>{user?.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {user?.email}
                </Card.Subtitle>
                <hr />
                <Card.Text>{user?.description}</Card.Text>
                {isEditable && (
                    <Col>
                        <Row className="mt-3 text-center text-info">
                            <Col sm={{ span: 20 }}>
                                <button
                                    className="me-4 px-2 editButton"
                                    onClick={handleShowProfile}
                                >
                                    사진 변경
                                </button>
                                <button
                                    className="me-4 px-2 editButton"
                                    onClick={() => setIsEditing(true)}
                                >
                                    편집
                                </button>
                                <button
                                    className="withdrawalButton px-2"
                                    onClick={handleShowWithdrawal}
                                >
                                    탈퇴
                                </button>
                                <WithdrawalModal
                                    show={showWithdrawal}
                                    handleClose={handleCloseWithdrawal}
                                    userDelete={userDelete}
                                />
                            </Col>
                        </Row>
                    </Col>
                )}
                {isNetwork && (
                    <Col className="text-center">
                        <Button
                            size="sm"
                            className="mt-3 networkButton"
                            href="#"
                            onClick={() => navigate(`/users/${user.id}`)}
                        >
                            포트폴리오
                        </Button>
                    </Col>
                )}
            </Card.Body>
        </Card>
    );
}

export default UserCard;
