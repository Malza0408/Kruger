import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Gather = ({ project }) => {
    const navigate = useNavigate();

    const handleOnClick = async () => {
        navigate(`/gatherRoom/${project.id}`);
    };
    return (
        <Card className="Gather" onClick={handleOnClick}>
            <Card.Body>
                <Row className="text-center mt-3">
                    <Card.Title className="mb-0">{project.title}</Card.Title>
                </Row>
                <div className="imageContainer" as={Row}>
                    <ul>
                        {project.language?.map((project, index) => {
                            return (
                                <li key={index}>
                                    {project === 'JavaScript' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/js.png`}
                                            alt="JavaScript"
                                        ></img>
                                    ) : project === 'Node.js' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/node.png`}
                                            alt="Node.js"
                                        ></img>
                                    ) : project === 'React' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/react.png`}
                                            alt="React"
                                        ></img>
                                    ) : project === 'TypeScript' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/ts.png`}
                                            alt="TypeScript"
                                        ></img>
                                    ) : project === 'Vue' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/vue.png`}
                                            alt="Vue"
                                        ></img>
                                    ) : project === 'Python' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/python.png`}
                                            alt="Python"
                                        ></img>
                                    ) : project === 'Django' ? (
                                        <img
                                            src={`${process.env.PUBLIC_URL}/gatherImg/django.png`}
                                            alt="Django"
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
                        <FontAwesomeIcon icon={faHeart} className="like-icon" />
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
