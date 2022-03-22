import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import * as Api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import NoteDescription from './NoteDescription';

const NoteListSend = ({ sendNote, setSendNote }) => {
    const navigate = useNavigate();

    const handleCheck = () => {
        Api.get(``)
    }

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
                            <span>
                                <strong>{sendNote.toUser.name}</strong>
                            </span>

                            <span className="text-muted">
                                <small>에게 보낸 쪽지</small>
                            </span>
                        </Card.Title>
                    </Col>
                    <Col>

                    </Col>
                </Row>
                <Col>
                    <Card.Link onClick={() => navigate(`/note/${sendNote.id}`)}>
                        <span>
                            <strong>{sendNote.title}</strong>
                        </span>
                    </Card.Link>
                </Col>
                <Row>
                    <Col>
                        <Card.Text>
                            <span className="text-muted">
                                {sendNote.createdAt}
                            </span>
                        </Card.Text>
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
                {/* <Card.Text>
                    <span className="text-muted">{sendNote.content}</span>
                </Card.Text> */}
            </Card.Body>
        </Card.Text>
    );
};

export default NoteListSend;
