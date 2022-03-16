import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import * as Api from '../../api';

const CertificateEditForm = ({ certificate, setIsEditing, setCertificate }) => {
    const user_id = certificate.user_id;
    const [title, setTitle] = useState(certificate.title);
    const [description, setDescription] = useState(certificate.description);
    const [date, setDate] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();

        // "certificates/certificate.id" 엔드포인트로 PUT 요청함.
        await Api.put(`certificates/${certificate.id}`, {
            user_id,
            title,
            description,
            date
        });

        await Api.get('certificatelist', user_id).then((res) =>
            setCertificate(res)
        );

        // isEditing을 false로 세팅하여 편집창 close
        setIsEditing(false);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group
                            controlId="formCertificateTitle"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="자격증 제목"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="formCertificateDescription"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="상세내역"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <DatePicker
                            selected={date}
                            onChange={(e) => setDate(e)}
                        />

                        <Form.Group as={Row} className="mt-3 text-center">
                            <Col sm={{ span: 20 }}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="me-3"
                                >
                                    확인
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsEditing(false)}
                                >
                                    취소
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default CertificateEditForm;
