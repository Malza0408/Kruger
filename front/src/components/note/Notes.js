import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { UserStateContext } from '../../App';
import NoteWriteForm from './NoteWriteForm';
import NoteBar from './NoteBar';

import NoteList from './NoteList';
import NoteListAll from './NoteListAll';
import NoteListSend from './NoteListSend';
import NoteListTake from './NoteListTake';

import * as Api from '../../api';

const Note = () => {
    const [isNoteListAll, setIsNoteListAll] = useState(true);
    const [isNoteListSendig, setIsNoteListSending] = useState(false);

    // const [isWriting, setIsWriting] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    
    
    // const [portfolioOwner, setPortfolioOwner] = useState(null);


    // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
    // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
    const userState = useContext(UserStateContext);

    // useState 훅을 통해 users 상태를 생성함.
    const [users, setUsers] = useState([]);

    // const fetchPorfolioOwner = async (ownerId) => {
    //     // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    //     const res = await Api.get('users', ownerId);
    //     // 사용자 정보는 response의 data임.
    //     const ownerData = res.data;
    //     // portfolioOwner을 해당 사용자 정보로 세팅함.
    //     setPortfolioOwner(ownerData);
    //     // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    // };

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate('/login');
            return;
        }
        // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
        Api.get('userlist').then((res) => setUsers(res.data));
    }, [userState, navigate]);

    useEffect(() => {
        // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
        if (!userState.user) {
            navigate('/login', { replace: true });
            return;
        }

        // if (params.userId) {
        //     // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
        //     const ownerId = params.userId;
        //     // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
        //     fetchPorfolioOwner(ownerId);
        // } else {
        //     // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
        //     const ownerId = userState.user.id;
        //     // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
        //     fetchPorfolioOwner(ownerId);
        // }
    }, [params, userState, navigate]);

    // console.log(portfolioOwner);
    return (
        <Container fluid>
            <NoteBar
                isNoteListAll={isNoteListAll}
                setIsNoteListAll={setIsNoteListAll}
                isNoteListSendig={isNoteListSendig}
                setIsNoteListSending={setIsNoteListSending}
            />
            <NoteList
                // portfolioOwner={portfolioOwner}
                isNoteListAll={isNoteListAll}
                setIsNoteListAll={setIsNoteListAll}
                isNoteListSendig={isNoteListSendig}
                setIsNoteListSending={setIsNoteListSending}
            />
        </Container>
    );
};

export default Note;
