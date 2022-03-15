import React from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';

const ProjectEditForm = ({ setIsEditing }) => {
  return (
    <Form>
      <Form.Group controlId='projectEditTitle'>
        <Form.Control type='text' placeholder='프로젝트 제목' />
      </Form.Group>
      <Form.Group className='mt-3' controlId='projectEditDescription'>
        <Form.Control type='text' placeholder='상세내역' />
      </Form.Group>
      <Row className='text-center mt-3'>
        <Col>
          <Button className='me-3' variant='primary' type='submit'>
            확인
          </Button>
          <Button
            variant='secondary'
            type='button'
            onClick={() => {
              setIsEditing(false);
            }}
          >
            취소
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProjectEditForm;
