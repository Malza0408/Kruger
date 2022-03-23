import { Container, Row, Card } from 'react-bootstrap';

const NoteFollow = ({ follow, setTo }) => {
    return (
        <Container>
            <Card>
                <Card.Body onClick={() => setTo(follow.email)}>
                    <Row>
                        <Row>{follow.name}</Row>
                        <Row>{follow.email}</Row>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default NoteFollow;
