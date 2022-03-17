import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
const EducationCard = ({ handleEditing, school, major, position }) => {
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <span>{school}</span>

                    <br />
                    <span className='text-muted'>{major} </span>

                    <span className='text-muted'>{position}</span>
                </Col>
                {school && (
                    <Col className='col-lg-1'>
                        <Button
                            className=''
                            variant='outline-info'
                            size='sm'
                            onClick={handleEditing}
                        >
                            편집
                        </Button>
                    </Col>
                )}
            </Row>

            <hr></hr>
        </>
    );
};

export default EducationCard;
