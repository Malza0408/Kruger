import React, { useState } from "react";
import { Card, Button, Col, Row, Form } from "react-bootstrap";

const Education = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [schoolInput, setSchoolInput] = useState("");
  const [majorInput, setMajorInput] = useState("");
  const [radioValue, setRadioValue] = useState("");

  const handleSchoolOnChange = (e) => {
    setSchoolInput(e.target.value);
  };
  const handleMajorOnChange = (e) => {
    setMajorInput(e.target.value);
  };
  const handleEditing = (e) => {
    setIsEditing(!isEditing);
  };
  const radioCheckTest = (e) => {
    setRadioValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (schoolInput && majorInput && radioValue) {
      setIsEditing(false);
      setSchoolInput("");
      setMajorInput("");
    }
  };
  return (
    <>
      {isEditing ? (
        <Card>
          <Card.Body>
            <Card.Title>학력</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="school.ControlInput">
                <Form.Label>학교</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="OO대학교"
                  onChange={handleSchoolOnChange}
                />
                {!schoolInput && (
                  <Form.Text className="text-danget">
                    대학교를 작성 해 주세요.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="major.ControlInput">
                <Form.Label>Major</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="OO전공"
                  onChange={handleMajorOnChange}
                />
                {!majorInput && (
                  <Form.Text className="text-danget">
                    전공을 작성 해 주세요.
                  </Form.Text>
                )}
                {/* name이 check 중복을 걸러줌 */}
                <div key="inline-radio" className="mt-2">
                  <Form.Check
                    inline
                    type="radio"
                    label="재학중"
                    id="radio-edit-1"
                    name="group1"
                    value="재학중"
                    onClick={radioCheckTest}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="학사졸업"
                    id="radio-edit-2"
                    name="group1"
                    value="학사졸업"
                    onClick={radioCheckTest}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="석사졸업"
                    id="radio-edit-3"
                    name="group1"
                    value="석사졸업"
                    onClick={radioCheckTest}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="박사졸업"
                    id="radio-edit-4"
                    name="group1"
                    value="박사졸업"
                    onClick={radioCheckTest}
                  />
                </div>
              </Form.Group>
              <Row className="justify-content-center">
                <Col lg="2">
                  <Button
                    variant="primary"
                    type="submit"
                    className="me-3"
                    onClick={handleSubmit}
                  >
                    확인
                  </Button>
                  <Button variant="secondary" onClick={handleEditing}>
                    취소
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>학력</Card.Title>
            <Card.Text className="mb-0">
              <Row className="align-items-center">
                <Col>
                  <span>OO대학교</span>
                  <br></br>
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
            <div className="mt-3 text-center mb-1">
              <div className="col-sm-12">
                <Button variant="primary">+</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Education;
