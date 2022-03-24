import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { get } from '../../api';

const Gather = ({ project, handleOnClickPost }) => {
    const navigate = useNavigate();

    const handleOnClick = async () => {
        navigate(`/gatherRoom/${project.id}`);
    };
    return (
        <Card
            style={{ width: '18rem' }}
            className="Gather"
            onClick={handleOnClick}
        >
            <Card.Body>
                <Row className="text-center mt-3">
                    <Card.Title className="mb-0">{project.title}</Card.Title>
                </Row>
                <div className="imageContainer" as={Row}>
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
                <Row>
                    <Col className="like-container text-end">
                        <img
                            src={`${process.env.PUBLIC_URL}/gatherImg/heart.png`}
                            alt="like"
                            width="20px"
                            height="20px"
                            className="me-1"
                        />
                        <span className="like-count">
                            {project.like.length}
                        </span>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Gather;
