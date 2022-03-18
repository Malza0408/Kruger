import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { parseISO, format } from 'date-fns';

import * as Api from '../../api';

const CertificateAddForm = ({ setIsAdding, setCertificate, portfolioOwnerId }) => {
    const user_id = portfolioOwnerId;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();

        // date format을 'yyyy-MM-dd'로 변경
        const year = date.getFullYear()
        const month = (date.getMonth()+1).toString().padStart(2, '0')
        const day = (date.getDate()).toString().padStart(2, '0')
        const newDate = `${year}-${month}-${day}`

        try {
            // "user/register" 엔드포인트로 post요청함.
            const res = await Api.post('certificate/create', {
                user_id,
                title,
                description,
                date: newDate
            });

            await Api.get('certificatelist', user_id).then((res) =>
            setCertificate(res.data)
            );

            console.log(res.data)

        } catch (err) {
            console.log('등록 실패', err); 
        }

        setIsAdding(false);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCertificateTitle">
                    <Form.Control
                        type="text"
                        placeholder="자격증 제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formCertificateDescription" className="mt-3">
                    <Form.Control
                        type="text"
                        placeholder="상세내역"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Row} className="mt-3">
                    <Col xs='auto'>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                        />
                    </Col>
                </Form.Group>

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
        </>
    );
};

export default CertificateAddForm;
