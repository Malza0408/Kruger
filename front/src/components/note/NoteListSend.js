import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import * as Api from '../../api';

const NoteListSend = ({ key, sendNote, setSendNote }) => {
    const handleDelete = async (e) => {
        e.preventDefault();

        await Api.delete(`sentNotes/${sendNote.id}`);

        // await Api.get('sentNotelist', user_id).then((res) => setSendNote(res.data));
        await Api.get(`sentNotelist`).then((res) => {
            setSendNote(res.data);
        });
    };

    return (
        <Card.Text as={Col}>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>
                            {sendNote.toUser.name}에게 보낸 쪽지
                        </Card.Title>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            size="sm"
                            className="mvpCardCancelButton"
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>{' '}
                    </Col>
                </Row>
                <Card.Text>{sendNote.title}</Card.Text>
                <Card.Text>
                    <span className="text-muted">{sendNote.content}</span>
                </Card.Text>
            </Card.Body>
        </Card.Text>
    );
};

export default NoteListSend;
