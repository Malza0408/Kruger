import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import * as Api from '../../api';

const CertificateAddForm = ({
    setIsAdding,
    setCertificate,
    portfolioOwnerId
}) => {
    const user_id = portfolioOwnerId;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

    const changeDateFormat = () => {
        // date format을 'yyyy-MM-dd'로 변경
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // title 공란이면 true
        setIsTitleEmpty(!title);
        // description 공란이면 true
        setIsDescriptionEmpty(!description);

        const newDate = changeDateFormat();

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

            console.log(res.data);
            setIsAdding(false);
        } catch (err) {
            console.log('등록 실패', err);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCertificateTitle">
                    <Form.Control
                        className="mvpCardInput"
                        type="text"
                        placeholder="자격증 제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {isTitleEmpty && (
                        <Form.Text className="text-success">
                            자격증 제목을 입력해주세요
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group
                    controlId="formCertificateDescription"
                    className="mt-3"
                >
                    <Form.Control
                        className="mvpCardInput"
                        type="text"
                        placeholder="상세내역"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {isDescriptionEmpty && (
                        <Form.Text className="text-success">
                            상세내역을 입력해주세요
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group as={Row} className="mt-3">
                    <Col xs="auto">
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                    {(isTitleEmpty || isDescriptionEmpty) && (
                        <Form.Text className="text-success">
                            빠짐 없이 입력해주세요
                        </Form.Text>
                    )}
                    <Col sm={{ span: 20 }}>
                        <Button
                            variant="primary"
                            type="submit"
                            className="me-3 mvpCardConfirmButton"
                        >
                            확인
                        </Button>
                        <Button
                            className="mvpCardCancelButton"
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
