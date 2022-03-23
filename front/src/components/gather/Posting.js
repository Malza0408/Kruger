import React, { useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PostingForm from './PostingForm';
import '../../styles/scss/posting.scss';
import { post } from '../../api';

const Posting = (props) => {
    const navigate = useNavigate();
    const titleRef = useRef();
    const contentRef = useRef();

    const handleOnClick = (e) => {
        navigate('/gatherRoom');
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            await post('recruit/create', {
                title: titleRef.current.value,
                detatil: contentRef.current.value
            });
            navigate('/gatherRoom');
        } catch (error) {
            throw new Error(error);
        }
    };
    return (
        <Container fluid style={{ width: '85%' }} className="Posting">
            <Row>
                <PostingForm
                    handleOnClick={handleOnClick}
                    handleOnSubmit={handleOnSubmit}
                    ref={{
                        titleRef,
                        contentRef
                    }}
                ></PostingForm>
            </Row>
        </Container>
    );
};

export default Posting;
