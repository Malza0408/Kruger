import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

import * as Api from '../../api';

const AwardCard = ({ setIsEditing, award, setAwards, isEditable }) => {
    const handleDelete = async (e) => {
        e.preventDefault();
        const user_id = award.user_id;
        await Api.delete(`awards/${award.id}`);
        await Api.get('awardlist', user_id).then((res) => setAwards(res.data));
    };
    return (
        <Card.Text as={Col}>
            <Row className="align-items-center">
                <Col>
                    <span>{award.title}</span>
                    <br />
                    <span className="text-muted">{award.description}</span>
                </Col>
                {/* 권한을 가졌을때만 편집 버튼 표시 */}
                {isEditable && (
                    <Col xs lg="1">
                        <Button
                            variant="outline-info"
                            size="sm"
                            className="mr-3 mb-1"
                            onClick={() => {
                                setIsEditing((prev) => !prev);
                            }}
                        >
                            편집
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>
                    </Col>
                )}
            </Row>
        </Card.Text>
    );
};

export default AwardCard;
