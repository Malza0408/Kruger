import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Row, Col, Button, Badge } from 'react-bootstrap';

import * as Api from '../../api';

const UnReadNote = () => {
    const [takeNoteCheck, setTakeNoteCheck] = useState('');
    const [countUnReadNote, setCountUnReadNoteCheck] = useState(0);

    // 로그인 후 최초의 수신 쪽지 get
    useEffect(() => {
        // 발신함
        Api.get(`takenNotelist`).then((res) => {
            setTakeNoteCheck(res.data);
        });
    }, []);

    // 5초마다 수신 쪽지 get
    useEffect(() => {
        const getTakeNotes = setInterval(() => {
            Api.get(`takenNotelist`).then((res) => {
                setTakeNoteCheck(res.data);
            });
        }, 5000);
    }, []);

    useEffect(() => {
        setCountUnReadNoteCheck(0)
        const checkTest = () => {
            // 읽지 않은 수신 쪽지가 있다면 countUnReadNote를 1씩 증가
            [...takeNoteCheck].map((note) => {
                note?.check === false &&
                    setCountUnReadNoteCheck((pre) => pre + 1);
            });
        };

        checkTest();
    }, [takeNoteCheck]);

    return (
        <Badge pill bg="danger">
            {countUnReadNote}
        </Badge>
    );
};

export default UnReadNote;
