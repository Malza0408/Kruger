import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
const ProjectCard = ({ setIsEditing, isAdding, setIsAdding }) => {
  return (
    <>
      <Card.Text>
        <Row className='align-items-center'>
          <Col>
            <span>1</span>
            <br />
            <span className='text-muted'>2</span>
          </Col>
          <Col className='col-lg-1'>
            <Button
              variant='outline-info'
              size='sm'
              className='mr-3'
              onClick={() => {
                setIsEditing(true);
              }}
            >
              편집
            </Button>
          </Col>
        </Row>
      </Card.Text>
    </>
  );
};

export default ProjectCard;
