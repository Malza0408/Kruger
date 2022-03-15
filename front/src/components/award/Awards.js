import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Award from './Award';
import AwardAddForm from './AwardAddForm';

const Awards = () => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        <Award
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
        {isAdding ? <AwardAddForm setIsAdding={setIsAdding} /> : null}
      </Card.Body>
    </Card>
  );
};

export default Awards;
