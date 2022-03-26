import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

import Certificate from './Certificate';
import CertificateAddForm from './CertificateAddForm';

import * as Api from '../../api';

const Certificates = ({ portfolioOwnerId, isEditable }) => {
    const [certificate, setCertificate] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        Api.get('certificatelist', portfolioOwnerId).then((res) =>
            setCertificate(res.data)
        );
    }, [portfolioOwnerId]);

    return (
        <>
            <Card className="mvpCard">
                <Card.Body>
                    <Card.Title className="mvpCardTitle">자격증</Card.Title>
                    {certificate.map((certificate) => {
                        return (
                            <Certificate
                                key={certificate.id}
                                certificate={certificate}
                                setCertificate={setCertificate}
                                portfolioOwnerId={portfolioOwnerId}
                                isEditable={isEditable}
                            />
                        );
                    })}
                    {isEditable && (
                        <Row className="text-center mt-3 mb-4">
                            <Col>
                                <Button
                                    variant="primary"
                                    onClick={() => setIsAdding(true)}
                                    className="mvpCardAddButton"
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
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default Certificates;
