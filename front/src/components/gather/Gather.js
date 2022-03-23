import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
const Gather = ({ project }) => {
    return (
        <Card style={{ width: '18rem' }} className="Gather">
            <Card.Body>
                <Row className="text-center">
                    <Card.Title>{project.title}</Card.Title>
                </Row>
                <div className="imageContainer">
                    <ul
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '0',
                            margin: '0'
                        }}
                    >
                        {project.language?.map((project, index) => {
                            return (
                                <li
                                    key={index}
                                    style={{
                                        listStyle: 'none',
                                        margin: '0.8rem'
                                    }}
                                >
                                    {project === 'JavaScript' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/js.png`}
                                            alt="JavaScript"
                                            width="45px"
                                            height="45px"
                                        ></img>
                                    ) : project === 'Node.js' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/node.png`}
                                            alt="Node.js"
                                            width="45px"
                                            height="45px"
                                        ></img>
                                    ) : project === 'React' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/react.png`}
                                            alt="React"
                                            width="45px"
                                            height="45px"
                                        ></img>
                                    ) : project === 'TypeScript' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/ts.png`}
                                            alt="TypeScript"
                                            width="45px"
                                            height="45px"
                                        ></img>
                                    ) : project === 'Vue' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/vue.png`}
                                            alt="Vue"
                                            width="45px"
                                            height="45px"
                                        ></img>
                                    ) : project === 'Python' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/python.png`}
                                            alt="Python"
                                            width="45px"
                                            height="45px"
                                        ></img>
                                    ) : project === 'Django' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/django.png`}
                                            alt="Django"
                                            width="45px"
                                            height="45px"
                                        ></img>
                                    ) : (
                                        <></>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <Col>
                    <Row className="mt-3 text-center text-info">
                        <Col sm={{ span: 20 }}></Col>
                    </Row>
                </Col>
            </Card.Body>
        </Card>
    );
};

export default Gather;
