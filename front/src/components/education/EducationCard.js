import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
const EducationCard = ({
    handleEditing,
    school,
    major,
    position,
    isEditable,
}) => {
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <span>{school}</span>

                    <br />
                    <span className='text-muted'>{major} </span>

                    <span className='text-muted'>{position}</span>
                </Col>
                {/* 편집 권한이 있다면 보여준다. */}
                {isEditable && school && (
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
