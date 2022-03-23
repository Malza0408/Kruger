import React, { forwardRef } from 'react';
import { Col, Form } from 'react-bootstrap';

const PostingForm = forwardRef(({ handleOnClick, handleOnSubmit }, ref) => {
    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Group controlId="posting">
                <Form.Label>제목</Form.Label>
                <Form.Control
                    placeholder="제목을 작성해주세요."
                    type="text"
                    ref={ref.titleRef}
                />
            </Form.Group>
            <Form.Group controlId="posting" className="mt-3">
                <Form.Label>모집 내용</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={15}
                    placeholder="프로젝트 및 스터디원을 구해보세요!"
                    ref={ref.contentRef}
                />
            </Form.Group>
            <Col className="text-end mt-3">
                <button onClick={handleOnClick}>취소</button>
                <button className="ms-3" type="submit">
                    등록하기
                </button>
            </Col>
        </Form>
    );
});

export default PostingForm;
