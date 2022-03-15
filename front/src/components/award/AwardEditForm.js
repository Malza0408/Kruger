import React from 'react';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';

const AwardEditForm = ({ setIsEditing }) => {
  return (
    <Form>
      <Form.Group controlId='awardEditTitle'>
        <Form.Control type='text' placeholder='수상내역' />
      </Form.Group>
      <Form.Group className='mt-3' controlId='awardEditDescription'>
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

export default AwardEditForm;
