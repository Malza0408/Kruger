import React from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';

import * as Api from '../../api';

const CertificateCard = ({ certificate, setIsEditing, isEditable, setCertificate }) => {
    const user_id = certificate.user_id;

    const handleDelete = async (e) => {
        e.preventDefault();

        await Api.delete(`certificates/${certificate.id}`)

        await Api.get('certificatelist', user_id).then((res) =>
            setCertificate(res.data)
        )
    }
    
    return (
        <>
            <Card.Text as={Col}>
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
                            <Button 
                                variant="outline-danger"
                                size="sm"
                                className='mr-3'
                                onClick={handleDelete}
                            >
                                삭제
                            </Button>{' '}
                        </Col>
                    )}
                </Row>
            </Card.Text>
        </>
    );
};

export default CertificateCard;
