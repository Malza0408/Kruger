import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const NoteListAll = ({ key, note, setNotes }) => {
    return (
        <Row>
            {note.title}
            {note.content}
        </Row>
        
    )
}

export default NoteListAll