import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

const CertificateAddForm = ({ setIsAdding }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState();
    const [date, setDate] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsAdding(false);
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
                                    onClick={() => setIsAdding(false)}
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

export default CertificateAddForm;