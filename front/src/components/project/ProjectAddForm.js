import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';

const ProjectAddForm = ({ setIsAdding }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post('', {

  //     });
  //   } catch (err) {
  //     console.log('내역 추가에 실패하였습니다.', err);
  //   }
  // };
  return (
    <Form>
      <Form.Group controlId='projectAddTitle'>
        <Form.Control type='text' placeholder='프로젝트 제목' />
      </Form.Group>
      <Form.Group className='mt-3' controlId='projectAddDescription'>
        <Form.Control type='text' placeholder='상세내역' />
      </Form.Group>
      <Row className='mt-3'>
        <Col className='col-auto'>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col className='col-auto'>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Col>
      </Row>

      <Row className='text-center mt-3'>
        <Col>
          <Button
            className='me-3'
            variant='primary'
            type='submit'
            // onClick={handleClick}
          >
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
      </Row>
    </Form>
  );
};

export default ProjectAddForm;
