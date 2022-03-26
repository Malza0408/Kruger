import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import * as Api from '../../api';
const ProjectCard = ({ setIsEditing, project, setProjects, isEditable }) => {
    const handleDelete = async (e) => {
        e.preventDefault();
        const user_id = project.user_id;
        await Api.delete(`projects/${project.id}`);
        await Api.get('projectlist', user_id).then((res) =>
            setProjects(res.data)
        );
    };
    return (
        <Card.Text as={Col}>
            <Row className="align-items-center">
                <Col>
                    <span>{project.title}</span>
                    <br />
                    <span className="text-muted">{project.description}</span>
                    <br />
                    <span className="text-muted">
                        {`${project.from_date} ~ ${project.to_date}`}
                    </span>
                </Col>
                {/* 권한을 가졌을때만 편집 버튼 표시 */}
                {isEditable && (
                    <Col xs lg="auto">
                        <Button
                            variant="primary"
                            size="sm"
                            className="me-2 mvpCardConfirmButton"
                            onClick={() => {
                                setIsEditing((prev) => !prev);
                            }}
                        >
                            편집
                        </Button>
                        <Button
                            className="mvpCardCancelButton"
                            variant="primary"
                            size="sm"
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>
                    </Col>
                )}
            </Row>
            <hr className="mvpCardHr" />
        </Card.Text>
    );
};

export default ProjectCard;
