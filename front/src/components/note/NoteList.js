import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import NoteListAll from './NoteListAll';
import NoteListSend from './NoteListSend';
import NoteListTake from './NoteListTake';

import * as Api from '../../api';

const NoteList = ({ portfolioOwnerId }) => {
    const [isNoteListAll, setIsNoteListAll] = useState(true);
    const [isNoteListSendig, setIsNoteListSending] = useState(false);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // "certificatelist/유저id" 엔드포인트로 GET 요청을 하고, certificatelistf를 response의 data로 세팅함.
        const res = Api.get('takenNotelist').then((res) => setNotes(res.data));
        console.log(res)
    }, [notes]);

    return (
        <div>
            <Button
                variant="primary"
                value="전체"
                className="me-3"
                onClick={() => setIsNoteListAll(true)}
            >
                전체
            </Button>
            <Button
                variant="primary"
                value="발신"
                className="me-3"
                onClick={() => {
                    setIsNoteListSending(true);
                    setIsNoteListAll(false);
                }}
            >
                발신함
            </Button>
            <Button
                variant="primary"
                value="발신"
                className="me-3"
                onClick={() => {
                    setIsNoteListSending(false);
                    setIsNoteListAll(false);
                }}
            >
                수신함
            </Button>
            리스트
            {!isNoteListAll && isNoteListSendig && <NoteListSend />}
            {!isNoteListAll && !isNoteListSendig && <NoteListTake />}
            {console.log('왜 안돼')}
            {console.log(notes)}
            {notes.map((note) => {
                console.log('sfds');
                console.log(note)
                // return isNoteListAll && <NoteListAll 
                //     key={note.id}
                //     note={note}
                //     setNotes={setNotes}
                // />;
            })}
        </div>
    );
};

export default NoteList;
