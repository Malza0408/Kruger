import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AwardAddForm = ({ setIsAdding, portfolioOwnerId, setAwards }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClick = async (e) => {
    // 데이터를 추가하기
    e.preventDefault();
    try {
      await axios.post('', {});
    } catch (err) {
      console.log('내역 추가에 실패하였습니다.', err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 데이터를 추가하기
    await axios.post('url', {
      title,
      description,
    });
    // 데이터를 다시 불러오고 추가 상태 false로 변환
    await axios.get('url').then((res) => setAwards(res.data));
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='awardAddTitle'>
        <Form.Control
          type='text'
          placeholder='수상내역'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className='mt-3' controlId='awardAddDescription'>
        <Form.Control
          type='text'
          placeholder='상세내역'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group as={Row} className='text-center mt-3'>
        <Col sm={{ span: 20 }}>
          <Button className='me-3' variant='primary' type='submit'>
            확인
          </Button>
          <Button
            variant='secondary'
            type='button'
            onClick={() => {
              setIsAdding(false);
            }}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default AwardAddForm;
