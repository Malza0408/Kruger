import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

const AwardEditForm = ({ setIsEditing, award, setAwards }) => {
  const [title, setTitle] = useState(award.title);
  const [description, setDescription] = useState(award.description);

  const handleSubmit = async (e) => {
    await axios.put('url', {
      title,
      description,
    });
    await axios.get('url').then((res) => setAwards(res.data));
    setIsEditing(false);
  };

  return (
    <Form>
      <Form.Group controlId='awardEditTitle'>
        <Form.Control
          type='text'
          placeholder='수상내역'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mt-3' controlId='awardEditDescription'>
        <Form.Control
          type='text'
          placeholder='상세내역'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group as={Row} className='text-center mt-3 mb-4'>
        <Col sm={{ span: 20 }}>
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
      </Form.Group>
    </Form>
  );
};

export default AwardEditForm;
