import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import * as Api from '../../api';

const CertificateEditForm = ({ certificate, setIsEditing, setCertificate }) => {
    const user_id = certificate.user_id;
    const [title, setTitle] = useState(certificate.title);
    const [description, setDescription] = useState(certificate.description);
    const [date, setDate] = useState(new Date(certificate.date));

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

        await Api.put(`certificates/${certificate.id}`, {
            user_id,
            title,
            description,
            date: newDate
        });

        await Api.get('certificatelist', user_id).then((res) =>
            setCertificate(res.data)
        );

        // 편집창 닫음
        setIsEditing(false);
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
                            onChange={(e) => setDate(e)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center mb-4">
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
                            onClick={() => setIsEditing(false)}
                        >
                            취소
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
};

export default CertificateEditForm;
