import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Dropdown, Form } from 'react-bootstrap';
import * as Api from '../../api';
import Gather from './Gather';

const Gathers = (props) => {
    const [projects, setProjects] = useState([
        <Gather></Gather>,
        <Gather></Gather>
    ]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                // 여기어 Project 불러오는 로직
                // const projects = await Api.get()
                // setProjects(projects);
            } catch (error) {
                throw new Error(error);
            }
        };
    });
    return (
        <Container fluid className="">
            <Row className="justify-content-md-center mb-4">
                <Col lg="3" style={{ width: '400px' }}>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Control
                            className="ms-2 filterInput"
                            type="text"
                            placeholder="입력해주세요..."
                            style={{ display: 'inline' }}
                        />
                    </Form>
                </Col>
                <Col>
                    <Dropdown className="ms-2">
                        <button className="orderState">버튼</button>

                        <Dropdown.Toggle
                            className="orderListButton"
                            id="dropdown-basic"
                        />

                        <Dropdown.Menu>
                            <Dropdown.Item value="이름오름차순">
                                이름 오름차순
                            </Dropdown.Item>
                            <Dropdown.Item value="이름내름차순">
                                이름 내름차순
                            </Dropdown.Item>
                            <Dropdown.Item value="포스팅 오름차순">
                                포스팅 오름차순
                            </Dropdown.Item>
                            <Dropdown.Item value="포스팅 내름차순">
                                포스팅 내림차순
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row xs="auto" className="jusify-content-center">
                {projects?.map((project) => {
                    return <Gather></Gather>;
                })}
            </Row>
        </Container>
    );
};

export default Gathers;
