import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';

const NoteListAll = ({ key, allNote, setAllNotes }) => {
    return (
        <Card.Text as={Col}>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>
                            {allNote.toUser.name}에게 보낸 쪽지
                        </Card.Title>
                    </Col>
                </Row>
                <Card.Text>{allNote.title}</Card.Text>
                <Card.Text>
                    <span className="text-muted">{allNote.content}</span>
                </Card.Text>
            </Card.Body>
        </Card.Text>
    );
};

export default NoteListAll;
