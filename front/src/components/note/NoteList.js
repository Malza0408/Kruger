import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import NoteListAll from './NoteListAll';
import NoteListSend from './NoteListSend';
import NoteListTake from './NoteListTake';

import * as Api from '../../api';

const NoteList = ({
    portfolioOwnerId,
    isNoteListAll,
    setIsNoteListAll,
    isNoteListSendig,
    setIsNoteListSending
}) => {
    const [allNote, setAllNote] = useState([]);
    const [sendNote, setSendNote] = useState([]);
    const [takeNote, setTakeNote] = useState([]);

    useEffect(() => {
        Api.get(`sentNotelist`).then((res) => {
            setSendNote(res.data);
        });
        Api.get(`takenNotelist`).then((res) => {
            setTakeNote(res.data);
        });
    }, [portfolioOwnerId]);

    return (
        <div>
            {/* 전체 */}
            {/* 전체 쪽지함 리스트 타임스탬프, 리스트 수신자 및 발신자 구분 미완, 추후 수정 */}
            {[...sendNote, ...takeNote].map((note) => {
                console.log(note);
                return (
                    isNoteListAll && (
                        <NoteListAll
                            key={note.id}
                            allNote={note}
                            setAllNote={setAllNote}
                        />
                    )
                );
            })}
            {/* 발신 */}
            {sendNote.map((note) => {
                return (
                    !isNoteListAll &&
                    isNoteListSendig && (
                        <NoteListSend
                            key={note.id}
                            sendNote={note}
                            setSendNote={setSendNote}
                        />
                    )
                );
            })}
            {/* 수신 */}
            {takeNote.length === 0 ? (
                <Col>수신함이 비었습니다.</Col>
            ) : (
                takeNote.map((note) => {
                    return (
                        !isNoteListAll &&
                        !isNoteListSendig && (
                            <NoteListTake
                                key={note.id}
                                takeNote={note}
                                setTakeNote={setTakeNote}
                            />
                        )
                    );
                })
            )}
        </div>
    );
};

export default NoteList;
