import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Award from './Award';
import AwardAddForm from './AwardAddForm';

const Awards = ({ portfolioOwnerId }) => {
  const [awards, setAwards] = useState([
    {
      user_id: 1,
      title: '개근상 수상',
      description: '하루도 빠짐없이 출석하였습니다.',
    },
    {
      user_id: 2,
      title: '개근상 수상2',
      description: '하루도 빠짐없이 출석하였습니다2.',
    },
  ]);
  // useState 훅을 통해 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => {
          return (
            <Award
              key={award.id}
              award={award}
              awards={awards}
              setAwards={setAwards}
            />
          );
        })}

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
        {isAdding ? (
          <AwardAddForm
            setIsAdding={setIsAdding}
            setAwards={setAwards}
            awards={awards}
          />
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default Awards;
