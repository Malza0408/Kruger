import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

const Certificate = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        <Card.Text className="mb-0">
          <Row className="align-items-center">
            <Col>
              <span>OO대학교</span>
              <br></br>
              <span className="text-muted">OO전공2</span>
            </Col>
            <Col className="col-lg-1">
              <Button className="" variant="outline-info" size="sm">
                편집
              </Button>
            </Col>
          </Row>
        </Card.Text>
        <div className="mt-3 text-center mb-1">
          <div className="col-sm-12">
            <Button variant="primary">+</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Certificate;
