import { Row, Col, Card, Button } from 'react-bootstrap';

const NoteFollow = ({ follow, setTo, setName }) => {
    return (
        // <Container>
        <Card.Text as={Col}>
        <Card.Body
            style={{ cursor: 'pointer' }}
            onClick={() => {
                // 팔료우 목록에서 선택한 사용자를 수신자로 설정
                setTo(follow.email);
                setName(follow.name);
            }}
        >
            <Row>
                <Row>{follow.name}</Row>
                <Row>{follow.email}</Row>
            </Row>
        </Card.Body>
        </Card.Text>
        // </Container>
    );
};

export default NoteFollow;
