import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

import * as Api from '../../api';

const AwardCard = ({ setIsEditing, award, setAwards, isEditable }) => {
    const handleDelete = async () => {
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
                    <Col xs lg="auto">
                        <Button
                            variant="primary"
                            size="sm"
                            className="me-2 mvpCardConfirmButton"
                            onClick={() => {
                                setIsEditing((prev) => !prev);
                            }}
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
                )}
            </Row>
            <hr className="mvpCardHr" />
        </Card.Text>
    );
};

export default AwardCard;
