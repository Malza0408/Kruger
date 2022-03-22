import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
const Gather = ({ project }) => {
    return (
        <Card style={{ width: '18rem' }} className="mb-2 ms-3 mr-5 UserCard">
            <Card.Body>
                <Row className="justify-content-md-center">
                    <img className="mb-3 mt-3 profileImage" alt="프로필 사진" />
                </Row>
                {/* <Card.Title>Gather</Card.Title> */}
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                {project?.map((project) => {
                    return (
                        <>
                            {project === 'js' ? (
                                <img
                                    src={`${process.env.PUBLIC_URL}/gatherImg/js.png`}
                                    alt="js"
                                ></img>
                            ) : project === 'node' ? (
                                <img
                                    src={`${process.env.PUBLIC_URL}/gatherImg/node.png`}
                                    alt="node"
                                ></img>
                            ) : project === 'react' ? (
                                <img
                                    src={`${process.env.PUBLIC_URL}/gatherImg/react.png`}
                                    alt="react"
                                ></img>
                            ) : project === 'ts' ? (
                                <img
                                    src={`${process.env.PUBLIC_URL}/gatherImg/ts.png`}
                                    alt="ts"
                                ></img>
                            ) : project === 'vue' ? (
                                <img
                                    src={`${process.env.PUBLIC_URL}/gatherImg/vue.png`}
                                    alt="vue"
                                ></img>
                            ) : (
                                <></>
                            )}
                        </>
                    );
                })}

                <Col>
                    <Row className="mt-3 text-center text-info">
                        <Col sm={{ span: 20 }}>
                            <button className="me-4 px-2 editButton">
                                프로필 변경
                            </button>
                            <button className="me-4 px-2 editButton">
                                편집
                            </button>
                            <button className="withdrawalButton px-2">
                                탈퇴
                            </button>
                        </Col>
                    </Row>
                </Col>
                <Button size="sm" className="mt-3 networkButton" href="#">
                    포트폴리오
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Gather;
