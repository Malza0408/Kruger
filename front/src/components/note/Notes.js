import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { UserStateContext } from '../../App';
import NoteBar from './NoteBar';
import NoteList from './NoteList';

const Note = () => {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);

    const [isNoteRefreshed, setIsNoteRefreshed] = useState(false);

    const [isNoteListAll, setIsNoteListAll] = useState(true);
    const [isNoteListSendig, setIsNoteListSending] = useState(false);

    useEffect(() => {
        // 전역 상태의 user가 null이라면 로그인 페이지로 이동
        if (!userState.user) {
            navigate('/login');
            return;
        }
    }, [userState, navigate]);

    return (
        <Container fluid className="noteBackground">
            <NoteBar
                setIsNoteListAll={setIsNoteListAll}
                setIsNoteListSending={setIsNoteListSending}
                isNoteRefreshed={isNoteRefreshed}
                setIsNoteRefreshed={setIsNoteRefreshed}
            />
            <NoteList
                isNoteListAll={isNoteListAll}
                isNoteListSendig={isNoteListSendig}
                isNoteRefreshed={isNoteRefreshed}
            />
        </Container>
    );
};

export default Note;
