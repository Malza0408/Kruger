import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import * as Api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';


const NoteListTake = ({ key, takeNote, setTakeNote }) => {
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();

        await Api.delete(`takenNotes/${takeNote.id}`);

        // await Api.get('sentNotelist', user_id).then((res) => setSendNote(res.data));
        await Api.get(`takenNotelist`).then((res) => {
            setTakeNote(res.data);
        });
    };

    return (
        <Card.Text as={Col}>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>
                            {takeNote.fromUser.name}가 보낸 쪽지
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
                <Row>
                    <Col>
                        <Card.Link onClick={() => navigate('/note/write')}>
                            {takeNote.title}
                        </Card.Link>
                    </Col>
                    <Col>
                        <Card.Text>
                            <span className="text-muted">
                                {takeNote.createdAt}
                            </span>
                        </Card.Text>
                    </Col>
                </Row>
                <Card.Text>
                    <span className="text-muted">{takeNote.content}</span>
                </Card.Text>
            </Card.Body>
        </Card.Text>
    );
};

export default NoteListTake;
