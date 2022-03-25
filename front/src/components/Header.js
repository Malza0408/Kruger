import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { UserStateContext, DispatchContext } from '../App';
import LogoutModal from './modal/LogoutModal';
import '../styles/scss/Header.scss';

import UnReadNote from '../components/note/UnReadNote';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    const userState = useContext(UserStateContext);
    const dispatch = useContext(DispatchContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
    const isLogin = !!userState.user;

    // 로그아웃 클릭 시 실행되는 함수
    const logout = () => {
        setMsg('정말 로그아웃 하시겠습니까 ?');
        handleShow();
    };
    const logoutConfirm = () => {
        // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
        sessionStorage.removeItem('userToken');
        // dispatch 함수를 이용해 로그아웃함.
        dispatch({ type: 'LOGOUT' });
        handleClose();
        // 기본 페이지로 돌아감.
        // navigate('/');
        window.location.replace('/');
    };

    return (
        <Navbar className="navbarWrap mb-4" expand="lg">
            <Container className="">
                <Navbar.Brand onClick={() => navigate('/')}>
                    <Image
                        src={`${process.env.PUBLIC_URL}/img/logo.png`}
                        alt="logo"
                        width="140"
                        height="50"
                        className="navbarLogo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    <Nav activeKey={location.pathname}>
                        <Nav.Item>
                            <Nav.Link
                                className="navbarButton"
                                onClick={() => navigate('/gatherRoom')}
                            >
                                프로젝트
                            </Nav.Link>
                        </Nav.Item>
                        <NavDropdown.Divider />
                        <Nav.Item>
                            <Nav.Link
                                className="navbarButton"
                                onClick={() => navigate('/note')}
                            >
                                쪽지
                                {isLogin && <UnReadNote />}
                            </Nav.Link>
                        </Nav.Item>
                        <NavDropdown.Divider />
                        <Nav.Item>
                            <Nav.Link
                                className="navbarButton"
                                onClick={() => navigate('/')}
                            >
                                나의 페이지
                            </Nav.Link>
                        </Nav.Item>
                        <NavDropdown.Divider />
                        <Nav.Item>
                            <Nav.Link
                                className="navbarButton"
                                onClick={() => navigate('/network')}
                            >
                                네트워크
                            </Nav.Link>
                        </Nav.Item>
                        <NavDropdown.Divider />
                        {isLogin && (
                            <Nav.Item>
                                <Nav.Link
                                    className="navbarButton"
                                    onClick={logout}
                                >
                                    로그아웃
                                </Nav.Link>
                            </Nav.Item>
                        )}
                        <LogoutModal
                            show={show}
                            handleClose={handleClose}
                            msg={msg}
                            logoutConfirm={logoutConfirm}
                        />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
