import React, { forwardRef } from 'react';
import {
    Button,
    Col,
    Dropdown,
    DropdownButton,
    Form,
    InputGroup
} from 'react-bootstrap';

const PostForm = forwardRef(
    (
        {
            handleSubmit,
            post,
            langInputValue,
            setLangInputValue,
            getLangFromDropDown,
            handleToggleEditDetail
        },
        ref
    ) => {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="posting" className="mb-3">
                    <Form.Control
                        placeholder="제목을 작성해주세요."
                        type="text"
                        size="lg"
                        ref={ref.titleRef}
                        defaultValue={post.title}
                    />
                </Form.Group>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        disabled
                        placeholder="사용할 언어를 선택해주세요."
                        value={langInputValue && langInputValue}
                        className="lang-input"
                    />
                    <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        className="lang-delete"
                        onClick={() => setLangInputValue([])}
                    >
                        Delete
                    </Button>
                    <DropdownButton
                        id="dropdownButton"
                        title="Language"
                        align="end"
                    >
                        <Dropdown.Item
                            href="#"
                            onClick={(e) => {
                                getLangFromDropDown(e.target.innerText);
                                e.target.hidden = true;
                            }}
                            hidden={langInputValue.includes('JavaScript')}
                        >
                            JavaScript
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#"
                            onClick={(e) => {
                                getLangFromDropDown(e.target.innerText);
                                e.target.hidden = true;
                            }}
                            hidden={langInputValue.includes('TypeScript')}
                        >
                            TypeScript
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#"
                            onClick={(e) => {
                                getLangFromDropDown(e.target.innerText);
                                e.target.hidden = true;
                            }}
                            hidden={langInputValue.includes('Node.js')}
                        >
                            Node.js
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#"
                            onClick={(e) => {
                                getLangFromDropDown(e.target.innerText);
                                e.target.hidden = true;
                            }}
                            hidden={langInputValue.includes('React')}
                        >
                            React
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#"
                            onClick={(e) => {
                                getLangFromDropDown(e.target.innerText);
                                e.target.hidden = true;
                            }}
                            hidden={langInputValue.includes('Vue')}
                        >
                            Vue
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#"
                            onClick={(e) => {
                                getLangFromDropDown(e.target.innerText);
                                e.target.hidden = true;
                            }}
                            hidden={langInputValue.includes('Python')}
                        >
                            Python
                        </Dropdown.Item>
                        <Dropdown.Item
                            href="#"
                            onClick={(e) => {
                                getLangFromDropDown(e.target.innerText);
                                e.target.hidden = true;
                            }}
                            hidden={langInputValue.includes('Django')}
                        >
                            Django
                        </Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
                <Form.Group controlId="posting" className="mt-3">
                    <Form.Control
                        as="textarea"
                        rows={15}
                        placeholder="프로젝트 및 스터디원을 구해보세요!"
                        size="lg"
                        ref={ref.detailRef}
                        defaultValue={post.detail}
                    />
                </Form.Group>
                <Col className="text-end mt-3">
                    <button
                        className="postingBtn"
                        onClick={handleToggleEditDetail}
                        type="button"
                    >
                        취소
                    </button>
                    <button className="postingBtn ms-3" type="submit">
                        등록하기
                    </button>
                </Col>
            </Form>
        );
    }
);

export default PostForm;
