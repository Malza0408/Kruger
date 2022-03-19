import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col, Image } from 'react-bootstrap';
import WithdrawalModal from '../modal/WithdrawalModal';
import ChangeProfileModal from '../modal/ChangeProfileModal';

import * as Api from '../../api';

function UserCard({ user, setUser, setIsEditing, isEditable, isNetwork }) {
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

        await Api.delete(`users/${user.id}`);

        // 탈퇴 후 로그인 화면으로 이동
        navigate('/login', { replace: true });
    };

    return (
        <Card className="mb-2 ms-3 mr-5" style={{ width: '18rem' }}>
            <Card.Body>
                <Row className="justify-content-md-center">
                    <Image
                        style={{
                            borderRadius: '50%',
                            width: '14rem',
                            height: '12rem'
                        }}
                        className="mb-3"
                        src={user?.picture}
                        alt="프로필 사진"
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
                <Card.Text>{user?.description}</Card.Text>
                {isEditable && (
                    <Col>
                        <Row className="mt-3 text-center text-info">
                            <Col sm={{ span: 20 }}>
                                <Button
                                    className="me-4"
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={handleShowProfile}
                                >
                                    프로필 변경
                                </Button>
                                <Button
                                    className="me-4"
                                    variant="outline-info"
                                    size="sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    편집
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handleShowWithdrawal}
                                >
                                    탈퇴
                                </Button>
                                <WithdrawalModal
                                    show={showWithdrawal}
                                    handleClose={handleCloseWithdrawal}
                                    userDelete={userDelete}
                                />

                                {/* onClick={userDelete} */}
                            </Col>
                        </Row>
                    </Col>
                )}
                {isNetwork && (
                    <Card.Link
                        className="mt-3"
                        href="#"
                        onClick={() => navigate(`/users/${user.id}`)}
                    >
                        포트폴리오
                    </Card.Link>
                )}
            </Card.Body>
        </Card>
    );
}

export default UserCard;
