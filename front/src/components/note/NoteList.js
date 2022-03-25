import React, { useState, useEffect } from 'react';

import NoteListSend from './NoteListSend';
import NoteListTake from './NoteListTake';

import * as Api from '../../api';

const NoteList = ({ isNoteListAll, isNoteListSendig }) => {
    const [allNote, setAllNote] = useState([]);
    const [sendNote, setSendNote] = useState([]);
    const [takeNote, setTakeNote] = useState([]);

    const [user, setUser] = useState(null);
 
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
    
    useEffect(() => {
        // 전체 쪽지함
        Api.get(`notelist`).then((res) => {
            setAllNote(res.data);
        });
    }, [sendNote, takeNote]);

    // 발신 시간 내림차순
    const DescCreatedAt = (note) => {
        const descAllNote = [...note];
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
            {/* 전체 쪽지함 */}
            {DescCreatedAt(allNote).map((note) => {
                return (
                    isNoteListAll &&
                    // 로그인 되어있는 사용자와 발신자가 일치한다면 발신 쪽지임
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
            {/* 발신함 */}
            {DescCreatedAt(sendNote).map((note) => {
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
            {/* 수신함 */}
            {DescCreatedAt(takeNote).map((note) => {
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
            })}
        </div>
    );
};

export default NoteList;
