import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import EducationForm from "./EducationForm";
const EducationBody = ({}) => {
  //   const [school, setSchool] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [schoolInput, setSchoolInput] = useState("");
  const [majorInput, setMajorInput] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [majorName, setMajorName] = useState("");
  const [schoolState, setSchoolState] = useState("");

  const handleEditing = (e) => {
    setIsEditing(!isEditing);
  };
  const handleSchoolOnChange = (e) => {
    setSchoolInput(e.target.value);
  };
  const handleMajorOnChange = (e) => {
    setMajorInput(e.target.value);
  };

  const radioCheckTest = (e) => {
    setRadioValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (schoolInput && majorInput && radioValue) {
      setIsEditing(false);
      setSchoolName(schoolInput);
      setMajorName(majorInput);
      setSchoolState(radioValue);
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
        <>
          <Card.Title>학력</Card.Title>
          <Card.Text className="mb-0">
            <Row className="align-items-center">
              <Col>
                {schoolName ? <span>{schoolName}</span> : <span>OO학교</span>}
                <br />
                {majorName ? (
                  <>
                    <span className="text-muted">{majorName} </span>
                    <span className="text-muted">({schoolState})</span>
                  </>
                ) : (
                  <>
                    <span className="text-muted">OO전공 </span>
                    <span className="text-muted">(재학중)</span>
                  </>
                )}
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
      )}
    </>
  );
};

export default EducationBody;
