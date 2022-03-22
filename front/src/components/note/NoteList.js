import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import NoteListAll from './NoteListAll';
import NoteListSend from './NoteListSend';
import NoteListTake from './NoteListTake';

import * as Api from '../../api';

const NoteList = ({ portfolioOwnerId }) => {
    const [isNoteListAll, setIsNoteListAll] = useState(true);
    const [isNoteListSendig, setIsNoteListSending] = useState(false);
    const [noteAll, setNotesAll] = useState([]);
    const [noteSend, setNotesSend] = useState([]);
    const [noteTake, setNotesTake] = useState([]);

    useEffect(() => {
        // "certificatelist/유저id" 엔드포인트로 GET 요청을 하고, certificatelistf를 response의 data로 세팅함.
        Api.get(`sentNotelist`).then((res) => setNotesAll(res.data));
        Api.get(`sentNotelist`).then((res) => setNotesSend(res.data));
        Api.get(`tekenNotelist`).then((res) => setNotesTake(res.data));
    }, [portfolioOwnerId]);
    // useEffect(() => {
    //     // "certificatelist/유저id" 엔드포인트로 GET 요청을 하고, certificatelistf를 response의 data로 세팅함.
    // }, [portfolioOwnerId]);

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
            {/* {!isNoteListAll && isNoteListSendig && <NoteListSend />} */}
            {/* {!isNoteListAll && !isNoteListSendig && <NoteListTake />} */}
            {/* {console.log(noteTake)} */}
            {/* 전체 */}
            {noteAll.map((note) => {
                return (
                    isNoteListAll && (
                        <NoteListAll
                            key={note.id}
                            note={note}
                            setNotes={setNotesAll}
                        />
                    )
                );
            })}
            {/* 발신 */}
            {noteSend.map((note) => {
                return (
                    !isNoteListAll &&
                    isNoteListSendig && (
                        <NoteListSend
                            key={note.id}
                            note={note}
                            setNotes={setNotesSend}
                        />
                    )
                );
            })}
            {/* 수신 */}
            {noteTake.length === 0 ? (
                <Col>수신함이 비었습니다.</Col>
            ) : (
                noteTake.map((note) => {
                    return (
                        !isNoteListAll &&
                        !isNoteListSendig && (
                            <NoteListTake
                                key={note.id}
                                note={note}
                                setNotes={setNotesTake}
                            />
                        )
                    );
                })
            )}
        </div>
    );
};

export default NoteList;
