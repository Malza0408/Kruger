import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import * as Api from '../../api';

import Project from './Project';
import ProjectAddForm from './ProjectAddForm';

const Projects = ({ portfolioOwnerId, isEditable }) => {
    const [projects, setProjects] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    // 처음 실행 후 ID가 바뀔때마다 렌더링
    useEffect(() => {
        Api.get('projectlist', portfolioOwnerId).then((res) =>
            setProjects(res.data)
        );
    }, [portfolioOwnerId]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>프로젝트</Card.Title>
                {/* 개별 이력을 반복문을 통해 구현 */}
                {projects.map((project) => {
                    return (
                        <Project
                            key={project.id}
                            project={project}
                            setProjects={setProjects}
                            isEditable={isEditable}
                        />
                    );
                })}
                {/* 권한을 가졌을때만 + 버튼 표시 */}
                {isEditable && (
                    <Row className='text-center mt-3 mb-4'>
                        <Col>
                            <Button
                                variant='primary'
                                onClick={() => {
                                    setIsAdding(true);
                                }}
                            >
                                +
                            </Button>
                        </Col>
                    </Row>
                )}
                {/* 추가 가능 상태가 되면 AwardAddForm 컴포넌트를 구현 */}
                {isAdding && (
                    <ProjectAddForm
                        setIsAdding={setIsAdding}
                        setProjects={setProjects}
                        portfolioOwnerId={portfolioOwnerId}
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default Projects;
