import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { UserStateContext, DispatchContext } from '../App';
import LogoutModal from './modal/LogoutModal';

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
        navigate('/');
    };

    return (
        <Nav activeKey={location.pathname}>
            <Nav.Item className="me-auto mb-5">
                <Nav.Link disabled>
                    안녕하세요, 포트폴리오 공유 서비스입니다.
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => navigate('/')}>나의 페이지</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => navigate('/note')}>쪽지</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => navigate('/network')}>
                    네트워크
                </Nav.Link>
            </Nav.Item>
            {isLogin && (
                <Nav.Item>
                    <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                </Nav.Item>
            )}
            <LogoutModal
                show={show}
                handleClose={handleClose}
                msg={msg}
                logoutConfirm={logoutConfirm}
            />
        </Nav>
    );
}

export default Header;
