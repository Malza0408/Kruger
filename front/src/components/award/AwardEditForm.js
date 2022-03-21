import * as Api from '../../api';
import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

const AwardEditForm = ({ setIsEditing, award, setAwards }) => {
    const [title, setTitle] = useState(award.title);
    const [description, setDescription] = useState(award.description);

    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = award.user_id;

        // title 공란이면 true
        setIsTitleEmpty(!title);
        // description 공란이면 true
        setIsDescriptionEmpty(!description);

        await Api.put(`awards/${award.id}`, {
            user_id,
            title,
            description
        });
        await Api.get('awardlist', user_id).then((res) => setAwards(res.data));
        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="awardEditTitle">
                <Form.Control
                    type="text"
                    placeholder="수상내역"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {isTitleEmpty && (
                    <Form.Text className="text-success">
                        자격증 제목을 입력해주세요
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mt-3" controlId="awardEditDescription">
                <Form.Control
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
            <Form.Group as={Row} className="text-center mt-3 mb-4">
                {(isTitleEmpty || isDescriptionEmpty) && (
                    <Form.Text className="text-success">
                        빠짐 없이 입력해주세요
                    </Form.Text>
                )}
                <Col sm={{ span: 20 }}>
                    <Button className="me-3" variant="primary" type="submit">
                        확인
                    </Button>
                    <Button
                        className="me-3"
                        variant="secondary"
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                        }}
                    >
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default AwardEditForm;
