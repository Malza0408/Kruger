import React, { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import EducationForm from "./EducationForm";

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
        <EducationForm
          handleSchoolOnChange={handleSchoolOnChange}
          handleMajorOnChange={handleMajorOnChange}
          schoolInput={schoolInput}
          majorInput={majorInput}
          radioCheckTest={radioCheckTest}
          handleSubmit={handleSubmit}
          handleEditing={handleEditing}
        />
      ) : (
        <Card>
          <Card.Body>
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
            <div className="mt-3 text-center mb-1">
              <div className="col-sm-12">
                <Button variant="primary" onClick={props.addEducation}>
                  +
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Education;
