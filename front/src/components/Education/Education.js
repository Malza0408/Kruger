import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import EducationBody from "./EducationBody";

const Education = (props) => {
  const [educationBody, setEducationBody] = useState([]);

  const addEducation = () => {
    setEducationBody([
      ...educationBody,
      <EducationBody key={educationBody.length} />,
    ]);
  };
  return (
    <Card>
      <Card.Body>
        <EducationBody />
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
  );
};

export default Education;
