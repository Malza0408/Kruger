import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import NoteListSend from './NoteListSend';
import NoteListTake from './NoteListTake';

import DatePicker from 'react-datepicker';

import * as Api from '../../api';

const NoteList = ({ isNoteListAll, isNoteListSendig }) => {
    const [allNote, setAllNote] = useState([]);
    const [sendNote, setSendNote] = useState([]);
    const [takeNote, setTakeNote] = useState([]);

    const [user, setUser] = useState(null);

    useEffect(() => {
        // 전체
        Api.get(`notelist`).then((res) => {
            setAllNote(res.data);
        });
    }, [sendNote, takeNote]);

    useEffect(() => {
        Api.get(`user/current`).then((res) => setUser(res.data));

        // 발신함
        Api.get(`sentNotelist`).then((res) => {
            setSendNote(res.data);
        });
        // 수신함
        Api.get(`takenNotelist`).then((res) => {
            setTakeNote(res.data);
        });
    }, []);

    const DescCreatedAtAll = () => {
        const descAllNote = [...allNote];
        descAllNote.sort((note1, note2) =>
            note1.createdAt < note2.createdAt
                ? 1
                : note1.createdAt > note2.createdAt
                ? -1
                : 0
        );

        return descAllNote;
    };

    return (
        <div>
            {/* 전체 */}
            {console.log(allNote)}
            {/* 전체 쪽지함 리스트 타임스탬프 정렬 기능 추후 구현 */}
            {DescCreatedAtAll().map((note) => {
                return (
                    isNoteListAll &&
                    (user.name === note.fromUser.name ? (
                        <NoteListSend
                            key={note.id}
                            sendNote={note}
                            setSendNote={setSendNote}
                        />
                    ) : (
                        <NoteListTake
                            key={note.id}
                            takeNote={note}
                            setTakeNote={setTakeNote}
                        />
                    ))
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
