import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';

const CertificateCard = ({ certificate, setIsEditing, isEditable }) => {
    return (
        <>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{certificate?.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {certificate?.description}
                            </Card.Subtitle>
                            <Card.Text>{certificate?.date}</Card.Text>
                        </Col>
                        {isEditable && (
                            <Col>
                                <Row className="mt-3 text-info">
                                    <Col sm={{ span: 20 }}>
                                        <Button
                                            variant="outline-info"
                                            size="sm"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            편집
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default CertificateCard;
