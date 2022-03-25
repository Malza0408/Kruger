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
import * as Api from '../../api';
import { UserStateContext } from '../../App';
import useGetLangFromDropDown from '../../custom/useGetLangFromDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/scss/Post.scss';

const Post = () => {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const post_id = useParams();
    // 포스팅된 공고문
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const [langInputValue, setLangInputValue] = useState([]);
    // 포스트를 수정중인지?
    const [isEditPost, setIsEditPost] = useState(false);
    // 댓글을 수정중인지?
    const [isEditComment, setIsEditComment] = useState(false);
    const [isLike, setIsLike] = useState(false);
    // 수정할 댓글 타겟
    const [targetComment, setTargetComment] = useState('');

    const commentRef = useRef();
    const titleRef = useRef();
    const detailRef = useRef();
    const modifyCommentInput = useRef();

    const handleDeadLine = async () => {
        if (userState.user.id === post?.captain.id) {
            await Api.patch(`recruit/toggle/${post.id}`);
            getPostData();
        } else {
            return;
        }
        console.log(post);
        console.log(userState.user);
    };

    const checkApply = () => {
        // post.member.find()
    };

    // 좋아요를 누른다.
    const handleClickLike = async () => {
        try {
            if (
                post.like.find((id) => id === userState.user.id) === undefined
            ) {
                await Api.patch(`likedRecruit/${post.id}`);
                getPostData();
            } else {
                await Api.patch(`unlikedRecruit/${post.id}`);
                getPostData();
            }
            setIsLike(!isLike);
        } catch (error) {
            throw new Error(error);
        }
    };

    // 댓글과 포스트를 함께 업데이트
    const getPostDataWithComment = useCallback(async () => {
        const result = await Api.get('recruit', post_id.id);
        // post 불러와서 세팅
        setPost(result.data);
        // 댓글 업데이트 하기
        setComments(result.data.comment);
        // 내가 이 포스트를 좋아요 눌렀는지 확인
        if (
            result.data.like.find((id) => id === userState.user._id) ===
            undefined
        ) {
            setIsLike(false);
        } else {
            setIsLike(true);
        }
    }, [post_id.id, userState.user._id]);

    // 포스트를 업데이트
    const getPostData = useCallback(async () => {
        const result = await Api.get('recruit', post_id.id);
        setPost(result.data);
    }, [post_id.id]);

    // 댓글을 단다.
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const content = commentRef.current.value;
        try {
            await Api.put(`recruit/comment/${post.id}`, {
                content
            });
            getPostDataWithComment();
            commentRef.current.value = '';
        } catch (error) {
            throw new Error(error);
        }
    };

    // 수정 이후에 완료 버튼 클릭
    const handleClickCommentModify = async () => {
        const content = modifyCommentInput.current.value;
        if (content === '') {
            setIsEditComment(false);
            setTargetComment('');
            return;
        }
        try {
            await Api.patch(`recruit/${post.id}/${targetComment}`, {
                content
            });
            setIsEditComment(false);
            setTargetComment('');
        } catch (error) {
            throw new Error(error);
        }
    };

    // 댓글을 삭제한다.
    const handleClickDeleteComment = (commentId) => {
        return async () => {
            try {
                await Api.patch(`recruit/delete/${post.id}/${commentId}`);
                getPostDataWithComment();
            } catch (error) {
                throw new Error(error);
            }
        };
    };

    // 댓글 수정 버튼을 눌러서 input 폼을 띄운다.
    const handleClickModifyComment = (commentId) => {
        return () => {
            setIsEditComment(true);
            setTargetComment(commentId);
        };
    };

    // 전체 내용 수정 제출
    const handleSubmit = async (e) => {
        console.log('진입!');
        e.preventDefault();
        try {
            await Api.put(`recruit/${post.id}`, {
                title: titleRef.current.value,
                detail: detailRef.current.value,
                language: langInputValue.split(' / ')
            });
            getPostData();
            setIsEditPost(!isEditPost);
        } catch (error) {}
    };

    // 전체 내용 수정 폼 띄울시 폼에 language 내용 넣기
    const handleToggleEditDetail = () => {
        setLangInputValue(post.language.join(' / '));
        setIsEditPost(!isEditPost);
    };

    const getLangFromDropDown = useGetLangFromDropDown({
        langInputValue,
        setLangInputValue
    });

    const deletePost = async () => {
        try {
            await Api.delete(`recruit/delete/${post.id}`);
            console.log(post.id);
            navigate('/gatherRoom');
        } catch (error) {
            throw new Error(error);
        }
    };

    const showLanguage = (post) => {
        const language = post?.language
            ?.reduce((prev, cur) => {
                return prev + cur + ' / ';
            }, '')
            .slice(0, -3);
        return language;
    };

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
        }

        getPostDataWithComment();
    }, [getPostDataWithComment, navigate, targetComment, userState.user]);

    return (
        <Container fluid className="Post">
            {isEditPost === false ? (
                <>
                    <Row>
                        <Col className="recruit-btn-group">
                            {post?.nowEnrolling === false ? (
                                <Button
                                    className="recruit-btn"
                                    variant="secondary"
                                    onClick={handleDeadLine}
                                >
                                    모집완료
                                </Button>
                            ) : (
                                <Button
                                    className="recruit-btn"
                                    variant="secondary"
                                    onClick={handleDeadLine}
                                >
                                    모집중
                                </Button>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="apply-btn-group">
                            {userState.user.id !== post?.captain.id ? (
                                <Button className="apply-btn">지원하기</Button>
                            ) : (
                                <></>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <h1>{post?.title}</h1>
                    </Row>
                    <Row>
                        <Col className="name">
                            <h4>{post?.captain?.name}</h4>
                        </Col>
                        <Col className="date">
                            <h2>{post?.createdAt.substr(0, 10)}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <h2>사용언어 : {showLanguage(post)}</h2>
                        <hr />
                    </Row>
                    <Row>
                        <Col>
                            <pre>{post?.detail}</pre>
                        </Col>
                    </Row>
                    {isLike === true ? (
                        <div className="heart-container">
                            <FontAwesomeIcon
                                icon={faHeart}
                                size={'2x'}
                                onClick={handleClickLike}
                                className="red-heart"
                            />
                            <div className="like-count">
                                {post?.like.length}
                            </div>
                        </div>
                    ) : (
                        <div className="heart-container">
                            <FontAwesomeIcon
                                icon={faHeart}
                                size={'2x'}
                                onClick={handleClickLike}
                                className="black-heart"
                            />
                            <div className="like-count">
                                {post?.like.length}
                            </div>
                        </div>
                    )}

                    {userState.user.id === post?.captain.id ? (
                        <Button
                            onClick={handleToggleEditDetail}
                            className="mb-3"
                        >
                            수정하기
                        </Button>
                    ) : (
                        <></>
                    )}
                    <Form onSubmit={handleSubmitComment}>
                        <Form.Group
                            className="mb-3 comment-form"
                            controlId="ControlTextarea"
                        >
                            <Form.Control
                                placeholder="댓글을 입력하세요."
                                as="textarea"
                                rows={4}
                                maxLength="200"
                                ref={commentRef}
                            />
                        </Form.Group>
                        <Row className="register-comment">
                            <Col>
                                <button type="submit">댓글 등록</button>
                            </Col>
                        </Row>
                    </Form>
                    <ul>
                        {comments?.map((comment) => {
                            return (
                                <Row
                                    className="comment-container"
                                    key={comment.id}
                                >
                                    {targetComment !== comment.id ? (
                                        <Col>
                                            <li>{comment.content}</li>
                                        </Col>
                                    ) : targetComment === comment.id ? (
                                        <>
                                            <Col>
                                                <Form.Control
                                                    ref={modifyCommentInput}
                                                />
                                            </Col>
                                            <Col className="complete-modify-btn">
                                                <button
                                                    onClick={
                                                        handleClickCommentModify
                                                    }
                                                >
                                                    완료
                                                </button>
                                            </Col>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {userState.user._id === comment.author &&
                                    isEditComment === false ? (
                                        <>
                                            <Col className="comment-btns">
                                                <button
                                                    className="comment-btn"
                                                    onClick={handleClickModifyComment(
                                                        comment.id
                                                    )}
                                                >
                                                    수정
                                                </button>
                                                <button
                                                    className="comment-btn"
                                                    onClick={handleClickDeleteComment(
                                                        comment.id
                                                    )}
                                                >
                                                    삭제
                                                </button>
                                            </Col>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Row>
                            );
                        })}
                    </ul>
                </>
            ) : (
                <Form onSubmit={handleSubmit}>
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
                            placeholder="사용할 언어를 선택해주세요."
                            value={langInputValue && langInputValue}
                            className="lang-input"
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="deleteBtn"
                            onClick={() => setLangInputValue([])}
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
            )}
            {userState.user.id === post?.captain.id ? (
                <Button onClick={deletePost}>포스트 삭제하기</Button>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default Post;
