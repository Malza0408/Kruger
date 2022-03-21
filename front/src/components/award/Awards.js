import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import * as Api from '../../api';

import Award from './Award';
import AwardAddForm from './AwardAddForm';

const Awards = ({ portfolioOwnerId, isEditable }) => {
    const [awards, setAwards] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    // 처음 실행 후 ID가 바뀔때마다 렌더링
    useEffect(() => {
        Api.get('awardlist', portfolioOwnerId).then((res) =>
            setAwards(res.data)
        );
    }, [portfolioOwnerId]);

    return (
        <Card className="mvpCard">
            <Card.Body>
                <Card.Title className="mvpCardTitle">수상이력</Card.Title>
                {/* 개별 이력을 반복문을 통해 구현 */}
                {awards.map((award) => {
                    return (
                        <Award
                            key={award.id}
                            award={award}
                            setAwards={setAwards}
                            isEditable={isEditable}
                        />
                    );
                })}
                {/* 권한을 가졌을때만 + 버튼 표시 */}
                {isEditable && (
                    <Row className="text-center mt-3 mb-4">
                        <Col>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setIsAdding(true);
                                }}
                                className="mvpCardAddButton"
                            >
                                +
                            </Button>
                        </Col>
                    </Row>
                )}
                {/* 추가 가능 상태가 되면 AwardAddForm 컴포넌트를 구현 */}
                {isAdding && (
                    <AwardAddForm
                        setIsAdding={setIsAdding}
                        setAwards={setAwards}
                        portfolioOwnerId={portfolioOwnerId}
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default Awards;
