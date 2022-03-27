import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
const EducationCard = ({
    handleEdit,
    handleDelete,
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
                        <Col xs lg="auto">
                            <Button
                                className="me-2 mvpCardConfirmButton"
                                variant="primary"
                                size="sm"
                                onClick={handleEdit}
                            >
                                편집
                            </Button>
                            <Button
                                className="mvpCardCancelButton"
                                variant="primary"
                                size="sm"
                                onClick={handleDelete}
                            >
                                삭제
                            </Button>
                        </Col>
                    </>
                )}
            </Row>
            <hr className="mvpCardHr" />
        </Card.Text>
    );
};

export default EducationCard;
