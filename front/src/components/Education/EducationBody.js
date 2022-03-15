import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
const EducationBody = ({ handleEditing }) => {
  return (
    <>
      <Card.Title>학력</Card.Title>
      <Card.Text className="mb-0">
        <Row className="align-items-center">
          <Col>
            <span>OO대학교</span>
            <br />
            <span className="text-muted">OO전공</span>
          </Col>
          <Col className="col-lg-1">
            <Button
              className=""
              variant="outline-info"
              size="sm"
              onClick={handleEditing}
            >
              편집
            </Button>
          </Col>
        </Row>
      </Card.Text>
      <hr></hr>
    </>
  );
};

export default EducationBody;
