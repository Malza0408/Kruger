import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
const EducationCard = ({
    handleEditing,
    handleDeleting,
    school,
    major,
    position,
    isEditable
}) => {
    return (
        <Card.Text as={Col}>
            <Row className="align-items-center">
                <Col>
                    <span>{school}</span>
                    <br />
                    <span className="text-muted">전공: {major.first} </span>
                    <br />
                    <span className="text-muted">부전공: {major.second} </span>
                    <br />
                    <span className="text-muted">졸업: {position}</span>
                </Col>
                {/* 편집 권한이 있다면 보여준다. */}
                {isEditable && school && (
                    <>
                        <Col className="col-lg-1">
                            <Button
                                className="mr-3 mb-1 mvpCardConfirmButton"
                                variant="primary"
                                size="sm"
                                onClick={handleEditing}
                            >
                                편집
                            </Button>
                            <Button
                                className="mvpCardCancelButton"
                                variant="primary"
                                size="sm"
                                onClick={handleDeleting}
                            >
                                삭제
                            </Button>
                        </Col>
                    </>
                )}
            </Row>
            <hr />
        </Card.Text>
    );
};

export default EducationCard;
