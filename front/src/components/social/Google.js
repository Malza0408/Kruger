import React, { useContext, useState } from 'react';
import { DispatchContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';

function Google() {
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);

    const Spinner = () => {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    };

    const googleLogin = async (code) => {
        try {
            // 백엔드로 코드 넘김
            const res = await Api.get(`auth/google?code=${code}`);
            console.log(res.data);
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
            console.log('로그인에 실패하였습니다.\n', err);
        }
    };

    // 인가코드
    // let code = new URL(window.location.href).searchParams.get('code');

    React.useEffect(() => {
        let code = new URL(window.location.href).searchParams.get('code');
        dispatch(googleLogin(code));
    }, []);

    return <Spinner />;
}

export default Google;
