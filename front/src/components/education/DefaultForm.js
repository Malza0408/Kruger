import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const DefaultForm = ({
    handleChange,
    school,
    major,
    subMajor,
    handleSubmit,
    handleClick,
    inputInfo,
    isSchoolEmpty,
    isMajorEmpty
}) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="school">
                <Form.Label>학교</Form.Label>
                <Form.Control
                    className="mvpCardInput"
                    type="text"
                    placeholder="OO대학교"
                    onChange={handleChange}
                    value={inputInfo?.school ?? school}
                />
                {isSchoolEmpty && (
                    <Form.Text className="text-success">
                        학교를 입력해주세요
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="major">
                <Form.Label>Major</Form.Label>
                <Form.Control
                    className="mvpCardInput"
                    type="text"
                    placeholder="OO전공"
                    onChange={handleChange}
                    value={inputInfo?.major.first ?? major}
                />
                {isMajorEmpty && (
                    <Form.Text className="text-success">
                        전공을 입력해주세요
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="subMajor">
                <Form.Label>subMajor</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="OO부전공"
                    onChange={handleChange}
                    value={inputInfo?.major.second ?? subMajor}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="radio">
                {/* name이 check 중복을 걸러줌 */}
                <div key="inline-radio" className="mt-2">
                    <Form.Check
                        inline
                        type="radio"
                        label="재학중"
                        id="radio"
                        name="group1"
                        value="재학중"
                        onChange={handleChange}
                        checked={inputInfo?.position === '재학중'}
                    />
                    <Form.Check
                        inline
                        type="radio"
                        label="학사졸업"
                        id="radio"
                        name="group1"
                        value="학사졸업"
                        onChange={handleChange}
                        checked={inputInfo?.position === '학사졸업'}
                    />
                    <Form.Check
                        inline
                        type="radio"
                        label="석사졸업"
                        id="radio"
                        name="group1"
                        value="석사졸업"
                        onChange={handleChange}
                        checked={inputInfo?.position === '석사졸업'}
                    />
                    <Form.Check
                        inline
                        type="radio"
                        label="박사졸업"
                        id="radio"
                        name="group1"
                        value="박사졸업"
                        onChange={handleChange}
                        checked={inputInfo?.position === '박사졸업'}
                    />
                </div>
            </Form.Group>
            <Row className="text-center">
                {(isSchoolEmpty || isMajorEmpty) && (
                    <Form.Text className="text-success">
                        빠짐 없이 입력해주세요
                    </Form.Text>
                )}
                <Col>
                    <Button
                        variant="primary"
                        type="submit"
                        className="me-3 mvpCardConfirmButton"
                    >
                        확인
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleClick}
                        className="mvpCardCancelButton"
                    >
                        취소
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default DefaultForm;
