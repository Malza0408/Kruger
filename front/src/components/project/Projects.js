import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Project from './Project';
import ProjectAddForm from './ProjectAddForm';

const Projects = () => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <Project
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
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
        {isAdding ? <ProjectAddForm setIsAdding={setIsAdding} /> : null}
      </Card.Body>
    </Card>
  );
};

export default Projects;
