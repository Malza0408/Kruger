import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const NoteListSend = ({ key, note, setNotes }) => {
    return (
        <Row>
            발신함
            {note.title}
            {note.content}
        </Row>
    );
};

export default NoteListSend;
