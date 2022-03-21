import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Datepicker from 'react-datepicker';

import * as Api from '../../api';

const ProjectEditForm = ({ setIsEditing, project, setProjects }) => {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [fromDate, setFromDate] = useState(new Date(project.from_date));
    const [toDate, setToDate] = useState(new Date(project.to_date));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = project.user_id;
        const from_date = fromDate.toISOString().split('T')[0];
        const to_date = toDate.toISOString().split('T')[0];

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
            </Form.Group>
            <Form.Group className="mt-3" controlId="projectEditDescription">
                <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
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
