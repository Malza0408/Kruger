import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import EducationBody from "./EducationBody";
import EducationForm from "./EducationForm";

const Education = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [schoolInput, setSchoolInput] = useState("");
  const [majorInput, setMajorInput] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [educationBody, setEducationBody] = useState([]);

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
  const addEducation = () => {
    setEducationBody([
      ...educationBody,
      <EducationBody
        key={educationBody.length}
        handleEditing={handleEditing}
      />,
    ]);
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
            <EducationBody handleEditing={handleEditing} />
            {educationBody?.map((body, index) => {
              return body;
            })}
            <div className="mt-3 text-center mb-1">
              <div className="col-sm-12">
                <Button variant="primary" onClick={addEducation}>
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
