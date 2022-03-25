import React, { forwardRef } from 'react';
import {
    Col,
    Form,
    InputGroup,
    Dropdown,
    DropdownButton,
    Button
} from 'react-bootstrap';

const PostingForm = forwardRef(
    (
        {
            handleClick,
            handleSubmit,
            handleToggle,
            getLangFromDropDown,
            langInputValue,
            handleDeleteInputValue
        },
        ref
    ) => {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="posting" className="mb-3">
                    {/* <Form.Label>제목</Form.Label> */}
                    <Form.Control
                        placeholder="제목을 작성해주세요."
                        type="text"
                        ref={ref.titleRef}
                        size="lg"
                    />
                </Form.Group>
                <InputGroup className="mb-3" ref={ref.languageFormRef}>
                    <Form.Control
                        type="text"
                        disabled
                        onClick={handleToggle}
                        placeholder="사용할 언어를 선택해주세요."
                        value={langInputValue && langInputValue}
                        ref={ref.dropDownMenuRef}
                    />
                    <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        className="deleteBtn"
                        onClick={handleDeleteInputValue}
                    >
                        Delete
                    </Button>
                    <DropdownButton
                        variant="outline-secondary"
                        title="Language"
                        id="input-group-dropdown"
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
                        ref={ref.contentRef}
                    />
                </Form.Group>
                <Col className="text-end mt-3">
                    <button onClick={handleClick} className="postingBtn">
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

export default PostingForm;
