import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import * as Api from '../../api';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteDescription = () => {
    const params = useParams();
    // const [noteId, setNoteId] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        // setNoteId(params.noteId);

        Api.get(`sentNotes/${params.noteId}`).then((res) => {
            setNote(res.data);
        });
        // Api.get(`takenNotelist`).then((res) => {
        //     setTakeNote(res.data);
        // });
    }, [params]);
    console.log({note});
    
    return (
        <div>
            <div>{note.title}</div>
            <div>{note.content}</div>
            <div>{note.createdAt}</div>
            {/* {/* <div>{note.fromUser.name}</div> */}
            {/* <div>{note.toUser.name}</div>  */}
        </div>
    );
};

export default NoteDescription;
