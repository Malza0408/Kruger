import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

import Certificate from './Certificate';
import CertificateAddForm from './CertificateAddForm';

import * as Api from '../../api';

const Certificates = ({ portfolioOwnerId, isEditable }) => {
    const [certificate, setCertificate] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        // "certificatelist/유저id" 엔드포인트로 GET 요청을 하고, certificatelistf를 response의 data로 세팅함.
        Api.get('certificatelist', portfolioOwnerId).then((res) =>
            setCertificate(res.data)
        );
    }, [portfolioOwnerId]);

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>자격증</Card.Title>
                    {certificate.map((certificate) => {
                        return (
                            <Certificate
                                certificate={certificate}
                                setCertificate={setCertificate}
                                portfolioOwnerId={portfolioOwnerId}
                                isEditable={isEditable}
                            />
                            );
                    })}
                    {isEditable && (
                        <Row className='text-center mt-3 mb-4'>
                            <Col>
                                <Button
                                    variant="primary"
                                    onClick={() => setIsAdding(true)}
                                >
                                    +
                                </Button>
                            </Col>
                        </Row>
                    )}
                    {isAdding && (
                        <CertificateAddForm
                            setIsAdding={setIsAdding}
                            setCertificate={setCertificate}
                            portfolioOwnerId={portfolioOwnerId}
                        />
                    ) }
                    
                </Card.Body>
            </Card>
        </>
    );
};

export default Certificates;
