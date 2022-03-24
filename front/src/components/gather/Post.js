import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import {
    Button,
    Container,
    Form,
    Row,
    Col,
    InputGroup,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { patch, put, get } from '../../api';
import { UserStateContext } from '../../App';
import useGetLangFromDropDown from '../../custom/useGetLangFromDropDown';

const Post = () => {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const post_id = useParams();
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    // const []
    const [langInputValue, setLangInputValue] = useState([]);
    const [isEditPost, setIsEditPost] = useState(false);

    const commentRef = useRef();
    const titleRef = useRef();
    const detailRef = useRef();

    const handleOnClickLike = async () => {
        try {
            if (
                post.like.find((id) => id === userState.user.id) === undefined
            ) {
                await patch(`likedRecruit/${post.id}`);
                getPostData();
            } else {
                await patch(`unlikedRecruit/${post.id}`);
                getPostData();
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const getPostDataWithComment = useCallback(async () => {
        const result = await get('recruit', post_id.id);
        setPost(result.data);
        setComments(result.data.comment);
        console.log(result.data);
    }, [post_id.id]);

    const getPostData = useCallback(async () => {
        const result = await get('recruit', post_id.id);
        setPost(result.data);
    }, [post_id.id]);

    const handleOnSubmitComment = async (e) => {
        e.preventDefault();
        const content = commentRef.current.value;
        try {
            await put(`recruit/comment/${post.id}`, {
                content
            });
            getPostDataWithComment();
            commentRef.current.value = '';
        } catch (error) {
            throw new Error(error);
        }
    };
    const handleOnClickDelete = (commentId) => {
        return async () => {
            try {
                await patch(`recruit/delete/${post.id}/${commentId}`);
                getPostDataWithComment();
            } catch (error) {
                throw new Error(error);
            }
        };
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(`recruit/${post.id}`, {
                title: titleRef.current.value,
                detail: detailRef.current.value,
                language: langInputValue.split(' / ')
            });
            getPostData();
            setIsEditPost(!isEditPost);
        } catch (error) {}
    };

    const handleToggleEditDetail = () => {
        setLangInputValue(post.language.join(' / '));
        setIsEditPost(!isEditPost);
    };
    const getLangFromDropDown = useGetLangFromDropDown({
        langInputValue,
        setLangInputValue
    });

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
        }
        getPostDataWithComment();
    }, [getPostDataWithComment, navigate, userState.user]);
    return (
        <Container fluid className="text-center" style={{ maxWidth: '1000px' }}>
            {isEditPost === false ? (
                <>
                    <Row>
                        <h1>{post?.title}</h1>
                    </Row>
                    <Row>
                        <Col>
                            <h4>{post?.captain?.name}</h4>
                        </Col>
                        <Col>
                            <h2>{post?.createdAt.substr(0, 10)}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <h2>
                            사용언어 :{' '}
                            {post?.language?.reduce((prev, cur, index) => {
                                return prev + cur + ' ';
                            }, '')}
                        </h2>
                        <hr style={{ maxWidth: '900px', margin: 'auto' }} />
                    </Row>
                    <Row>
                        <Col>
                            <pre>{post?.detail}</pre>
                        </Col>
                    </Row>
                    <img
                        src={`${process.env.PUBLIC_URL}/gatherImg/heart.png`}
                        alt="like"
                        width="20px"
                        height="20px"
                        className="me-1"
                        onClick={handleOnClickLike}
                    />

                    <span className="like-count">{post?.like.length}</span>
                    <Button onClick={() => handleToggleEditDetail()}>
                        수정하기
                    </Button>
                    <Form onSubmit={handleOnSubmitComment}>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                            style={{ maxWidth: '900px', margin: 'auto' }}
                        >
                            <Form.Control
                                placeholder="댓글을 입력하세요."
                                as="textarea"
                                rows={4}
                                ref={commentRef}
                            />
                        </Form.Group>
                        <Button type="submit">댓글 등록</Button>
                        <ul>
                            {comments?.map((comment, index) => {
                                return (
                                    <Row>
                                        <Col>
                                            <li key={index}>
                                                {comment.content}
                                            </li>
                                        </Col>
                                        <Col>
                                            <Button
                                                onClick={handleOnClickDelete(
                                                    comment.id
                                                )}
                                            >
                                                삭제
                                            </Button>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </ul>
                    </Form>
                </>
            ) : (
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group controlId="posting" className="mb-3">
                        {/* <Form.Label>제목</Form.Label> */}
                        <Form.Control
                            placeholder="제목을 작성해주세요."
                            type="text"
                            size="lg"
                            ref={titleRef}
                            defaultValue={post.title}
                        />
                    </Form.Group>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            disabled
                            // onClick={handleToggle}
                            placeholder="사용할 언어를 선택해주세요."
                            value={langInputValue && langInputValue}
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="deleteBtn"
                            onClick={() => setLangInputValue('')}
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
                            ref={detailRef}
                            defaultValue={post.detail}
                        />
                    </Form.Group>
                    <Col className="text-end mt-3">
                        <button
                            className="postingBtn"
                            onClick={() => handleToggleEditDetail()}
                        >
                            취소
                        </button>
                        <button className="postingBtn ms-3" type="submit">
                            등록하기
                        </button>
                    </Col>
                </Form>
            )}
        </Container>
    );
};

export default Post;
