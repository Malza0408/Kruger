import React, { useState } from 'react';
import { Container, Accordion, Form, Row, Col, Button } from 'react-bootstrap';

const NoteWriteBar = ({ isWriting, setIsWriting }) => {
    return (
        <div>
            <Row>
                <Col>
                    <Button
                        variant="primary"
                        value="전송"
                        className="me-3"
                        onClick={() => setIsWriting(!isWriting)}
                    >
                        쪽지 작성
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default NoteWriteBar;
