import React from 'react';
import Gathers from './Gathers';
import '../../styles/scss/gatherRoom.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GatherRoom = () => {
    const navigate = useNavigate();
    const handleClickNewPosting = () => {
        navigate('/posting');
    };

    return (
        <Container fluid style={{ width: '85%' }} className="gatherRoom">
            <Row className="text-end">
                <Col>
                    <button
                        className="newPostingBtn"
                        onClick={handleClickNewPosting}
                    >
                        새 글 쓰기
                    </button>
                </Col>
            </Row>
            <Gathers></Gathers>
        </Container>
    );
};

export default GatherRoom;
