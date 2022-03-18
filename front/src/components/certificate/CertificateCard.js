import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';

const CertificateCard = ({ certificate, setIsEditing, isEditable }) => {
    return (
        <>
            <Card.Text>
                <Row className='align-items-center'>
                <Col>
                    {certificate.title}
                    <br />
                    <span className="text-muted">{certificate.description}</span>
                    <br />
                    <span className="text-muted">{certificate.date}</span>
                </Col>
                    {isEditable && (
                        <Col xs lg='1'>
                            <Button
                                variant="outline-info"
                                size="sm"
                                className='mr-3'
                                onClick={() => setIsEditing(true)}
                            >
                                편집
                            </Button>
                        </Col>
                    )}
                </Row>
            </Card.Text>
        </>
    );
};

export default CertificateCard;
