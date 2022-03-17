import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

const ProjectCard = ({ setIsEditing, project, isEditable }) => {
    return (
        <Card.Text>
            <Row className='align-items-center'>
                <Col>
                    <span>{project.title}</span>
                    <br />
                    <span className='text-muted'>{project.description}</span>
                    <br />
                    <span className='text-muted'>
                        {`${project.from_date} ~ ${project.to_date}`}
                    </span>
                </Col>
                {/* 권한을 가졌을때만 편집 버튼 표시 */}
                {isEditable && (
                    <Col xs lg='1'>
                        <Button
                            variant='outline-info'
                            size='sm'
                            className='mr-3'
                            onClick={() => {
                                setIsEditing((prev) => !prev);
                            }}
                        >
                            편집
                        </Button>
                    </Col>
                )}
            </Row>
        </Card.Text>
    );
};

export default ProjectCard;
