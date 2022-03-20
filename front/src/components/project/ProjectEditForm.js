import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Datepicker from 'react-datepicker';

import * as Api from '../../api';

const ProjectEditForm = ({ setIsEditing, project, setProjects }) => {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [fromDate, setFromDate] = useState(new Date(project.from_date));
    const [toDate, setToDate] = useState(new Date(project.to_date));

    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = project.user_id;
        const from_date = fromDate.toISOString().split('T')[0];
        const to_date = toDate.toISOString().split('T')[0];

        // title 공란이면 true
        setIsTitleEmpty(!title);
        // description 공란이면 true
        setIsDescriptionEmpty(!description);

        await Api.put(`projects/${project.id}`, {
            user_id,
            title,
            description,
            from_date,
            to_date
        });
        await Api.get('projectlist', user_id).then((res) =>
            setProjects(res.data)
        );
        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="projectEditTitle">
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
            <Form.Group className="mt-3" controlId="projectEditDescription">
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
            <Form.Group
                as={Row}
                className="mt-3"
                controlId="projectAddDescription"
            >
                <Col xs="auto">
                    <Datepicker
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                    />
                </Col>
                <Col xs="auto">
                    <Datepicker
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                    />
                </Col>
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

export default ProjectEditForm;
