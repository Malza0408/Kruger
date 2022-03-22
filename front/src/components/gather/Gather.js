import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
const Gather = ({ project }) => {
    return (
        <Card style={{ width: '18rem' }} className="Gather">
            <Card.Body>
                <Row className="text-center">
                    <Card.Title>팀원 모집중!</Card.Title>
                </Row>
                <div className="imageContainer">
                    {project?.map((project) => {
                        return (
                            <>
                                {project === 'js' ? (
                                    <img
                                        src={`${process.env.PUBLIC_URL}/gatherImg/js.png`}
                                        alt="js"
                                        width="45px"
                                        height="45px"
                                    ></img>
                                ) : project === 'node' ? (
                                    <img
                                        src={`${process.env.PUBLIC_URL}/gatherImg/node.png`}
                                        alt="node"
                                        width="45px"
                                        height="45px"
                                    ></img>
                                ) : project === 'react' ? (
                                    <img
                                        src={`${process.env.PUBLIC_URL}/gatherImg/react.png`}
                                        alt="react"
                                        width="45px"
                                        height="45px"
                                    ></img>
                                ) : project === 'ts' ? (
                                    <img
                                        src={`${process.env.PUBLIC_URL}/gatherImg/ts.png`}
                                        alt="ts"
                                        width="45px"
                                        height="45px"
                                    ></img>
                                ) : project === 'vue' ? (
                                    <img
                                        src={`${process.env.PUBLIC_URL}/gatherImg/vue.png`}
                                        alt="vue"
                                        width="45px"
                                        height="45px"
                                    ></img>
                                ) : project === 'python' ? (
                                    <img
                                        src={`${process.env.PUBLIC_URL}/gatherImg/python.png`}
                                        alt="pyton"
                                        width="45px"
                                        height="45px"
                                    ></img>
                                ) : project === 'django' ? (
                                    <img
                                        src={`${process.env.PUBLIC_URL}/gatherImg/django.png`}
                                        alt="django"
                                        width="45px"
                                        height="45px"
                                    ></img>
                                ) : (
                                    <></>
                                )}
                            </>
                        );
                    })}
                </div>

                <Col>
                    <Row className="mt-3 text-center text-info">
                        <Col sm={{ span: 20 }}></Col>
                    </Row>
                </Col>
                <Button
                    size="sm"
                    className="mt-3 networkButton"
                    href="#"
                ></Button>
            </Card.Body>
        </Card>
    );
};

export default Gather;
