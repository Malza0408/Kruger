import { Container, Row, Card, Col, Dropdown } from 'react-bootstrap';

const NoteFollow = ({ follow, setTo, setName }) => {
    return (
        // <Container>
        // <Card.Text as={Col}>
        // <Card.Body
        <Dropdown.Item
            style={{ cursor: 'pointer' }}
            onClick={() => {
                setTo(follow.email);
                setName(follow.name);
            }}
        >
            <Row>
                <Row>{follow.name}</Row>
                <Row>{follow.email}</Row>
            </Row>
            {/* <hr /> */}
        </Dropdown.Item>
        // </Card.Body>
        // </Card.Text>

        // </Container>
    );
};

export default NoteFollow;
