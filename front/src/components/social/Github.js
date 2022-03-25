import React, { useContext, useState } from 'react';
import { DispatchContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Image, Container, Col, Row, Form, Button } from 'react-bootstrap';
import * as Api from '../../api';

function Github() {
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);

    const Spinner = () => {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    };

    const githubLogin = async (code) => {
        try {
            // 백엔드로 코드 넘김
            const res = await Api.get(`auth/github?code=${code}`);

            // 유저 정보는 response의 data임.
            const user = res.data;
            // JWT 토큰은 유저 정보의 token임.
            const jwtToken = user.token;
            // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
            sessionStorage.setItem('userToken', jwtToken);
            // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: user
            });
            // 기본 페이지로 이동함.
            navigate('/', { replace: true });
        } catch (err) {
            // setIsLoginFail(true);
            alert('로그인에 실패하였습니다.\n로그인 페이지로 이동합니다.', err);
            navigate('/', { replace: true });
        }
    };

    // 인가코드
    let code = new URL(window.location.href).searchParams.get('code');
    React.useEffect(() => {
        dispatch(githubLogin(code));
    }, []);

    return <Spinner />;
}

export default Github;
