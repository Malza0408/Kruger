import React, { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';

import * as Api from '../../api';

const UnReadNote = () => {
    const [takeNoteCheck, setTakeNoteCheck] = useState('');
    const [countUnReadNote, setCountUnReadNoteCheck] = useState(0);

    // 로그인 후와 reload 마다 수신 쪽지 get
    useEffect(() => {
        // 발신함
        Api.get(`takenNotelist`).then((res) => {
            setTakeNoteCheck(res.data);
        });
    }, []);

    // // 실시간 갱신: 5초마다 수신 쪽지 get
    // useEffect(() => {
    //     const getTakeNotes = setInterval(() => {
    //         Api.get(`takenNotelist`).then((res) => {
    //             setTakeNoteCheck(res.data);
    //         });
    //     }, 5000);
    // }, []);

    useEffect(() => {
        // 읽지 않은 쪽지 수 초기화 
        setCountUnReadNoteCheck(0);

        const checkTest = () => {
            // 읽지 않은 쪽지가 있다면 countUnReadNote를 1씩 증가
            [...takeNoteCheck].map((note) => {
                note?.check === false &&
                    setCountUnReadNoteCheck((pre) => pre + 1);
            });
        };

        checkTest();
    }, [takeNoteCheck]);

    return (
        // 읽지 않은 쪽지 수를 Badge 형태로 헤더에 띄움
        <Badge pill bg="danger">
            {countUnReadNote}
        </Badge>
    );
};

export default UnReadNote;
