import { Container, Row, Card, Col } from 'react-bootstrap';

const NoteFollow = ({ follow, setTo }) => {
    return (
        // <Container>
        <Card.Text as={Col}>
            <Card.Body style={{cursor: 'pointer'}} onClick={() => setTo(follow.email)}>
                <Row>
                    <Row>{follow.name}</Row>
                    <Row>{follow.email}</Row>
                </Row>
            </Card.Body>
            {/* <hr /> */}
        </Card.Text>
        // </Container>
    );
};

export default NoteFollow;
