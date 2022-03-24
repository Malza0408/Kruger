import React, { useContext, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PostingForm from './PostingForm';
import '../../styles/scss/Posting.scss';
import { UserStateContext } from '../../App';
import { post } from '../../api';
import useGetLangFromDropDown from '../../custom/useGetLangFromDropDown';

const Posting = (props) => {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const titleRef = useRef();
    const contentRef = useRef();
    const languageFormRef = useRef();
    const dropDownMenuRef = useRef();
    const [isToggle, setIsToggle] = useState(false);
    const [langInputValue, setLangInputValue] = useState([]);

    const handleOnClick = (e) => {
        navigate('/gatherRoom');
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            await post('recruit/create', {
                user_id: userState.id,
                title: titleRef.current.value,
                detail: contentRef.current.value,
                language: langInputValue.split(' / ')
            });
            navigate('/gatherRoom');
        } catch (error) {
            throw new Error(error);
        }
    };
    const handleToggle = () => {
        setIsToggle(!isToggle);
    };
    const getLangFromDropDown = useGetLangFromDropDown({
        langInputValue,
        setLangInputValue
    });
    const handleOnDeleteInputValue = () => {
        setLangInputValue('');
    };
    return (
        <Container fluid className="Posting">
            <Row className="justify-content-center">
                <PostingForm
                    handleOnClick={handleOnClick}
                    handleOnSubmit={handleOnSubmit}
                    handleToggle={handleToggle}
                    isToggle={isToggle}
                    getLangFromDropDown={getLangFromDropDown}
                    langInputValue={langInputValue}
                    handleOnDeleteInputValue={handleOnDeleteInputValue}
                    ref={{
                        titleRef,
                        contentRef,
                        languageFormRef,
                        dropDownMenuRef
                    }}
                />
            </Row>
        </Container>
    );
};

export default Posting;
