import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import { Button, Container, Form, Row, Col, Dropdown } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as Api from '../../api';
import { UserStateContext } from '../../App';
import useGetLangFromDropDown from '../../custom/useGetLangFromDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/scss/Post.scss';
import ApplicantlistCanvas from './ApplicantlistCanvas';
import MemberListCanvas from './MemberListCanvas';
import PostForm from './PostForm';

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
    const [applicants, setApplicants] = useState([]);
    const [members, setMembers] = useState([]);

    // Applicants offcanvas
    const [showOffApplicantscanvas, setShowOffApplicantscanvas] =
        useState(false);
    const handleCloseApplicantscanvas = () => {
        setShowOffApplicantscanvas(false);
    };
    const handleShowApplicatntscanvas = () => {
        setShowOffApplicantscanvas(true);
    };

    // MemberList offcanvas
    const [showOffMemberListcanvas, setShowOffMemberListcanvas] =
        useState(false);
    const handleCloseMemberListcanvas = () => {
        setShowOffMemberListcanvas(false);
    };
    const handleShowMemberListcanvas = () => {
        setShowOffMemberListcanvas(true);
    };

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
    };

    const apply = async () => {
        await Api.patch(`recruit/apply/${post.id}`);
        getPostData();
    };

    const checkApply = () => {
        // 못찾았으면
        return (
            post?.applicant.find((app) => app.id === userState.user.id) ===
            undefined
        );
    };

    const checkMember = () => {
        return (
            post?.member.find((m) => m.name === userState.user.name) ===
            undefined
        );
    };

    const cancelApply = async () => {
        await Api.patch(`recruit/cancle/apply/${post.id}`);
        getPostData();
    };

    const cmpUserAndCaptain = () => {
        return userState.user.id === post?.captain.id;
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

    // 포스트를 업데이트
    const getPostData = useCallback(async () => {
        const result = await Api.get('recruit', post_id.id);
        setPost(result.data);
    }, [post_id.id]);

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
            navigate('/gatherRoom');
        } catch (error) {
            throw new Error(error);
        }
    };

    const showLanguage = (post) => {
        return post?.language.map((lang, index) => {
            return (
                <Button
                    className="lang-badge"
                    variant="default"
                    as={Col}
                    key={index}
                >
                    {lang}
                </Button>
            );
        });
    };

    const handliClickAcknowledgment = (applicantId) => {
        return async () => {
            await Api.patch(`recruit/approval/${post.id}`, {
                applicantId
            });
            getPostData();
        };
    };

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
        }

        getPostDataWithComment();
    }, [getPostDataWithComment, navigate, targetComment, userState.user]);

    useEffect(() => {
        setApplicants(post?.applicant);
        setMembers(post?.member);
    }, [post?.applicant, post?.member]);

    return (
        <>
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
                        {/*  내가 올린 공지 */}
                        {cmpUserAndCaptain() ? (
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle>
                                        지원자 / 멤버
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            href="#/action-1"
                                            onClick={
                                                handleShowApplicatntscanvas
                                            }
                                        >
                                            지원자 목록
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            href="#/action-2"
                                            onClick={handleShowMemberListcanvas}
                                        >
                                            멤버 목록
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ) : (
                            <></>
                        )}
                        <Row>
                            <Col className="apply-btn-group">
                                {/* 내가 올린 모집글이 아니면서 */}
                                {!cmpUserAndCaptain() &&
                                    // 모집 중인 글이라면
                                    (post?.nowEnrolling ? (
                                        // 내가 지원자도 아니고 승인된 멤버도 아니라면 지원하기!
                                        checkApply() && checkMember() ? (
                                            <Button
                                                className="apply-btn"
                                                onClick={apply}
                                            >
                                                지원하기
                                            </Button>
                                        ) : // 지원자인 경우 지원취소!(승인되지 않음)
                                        !checkApply() ? (
                                            <Button
                                                className="apply-btn"
                                                onClick={cancelApply}
                                            >
                                                지원취소
                                            </Button>
                                        ) : // 멤버일 때 승인완료!(승인 됨, 낙장불입!)
                                        !checkMember() ? (
                                            <Button
                                                className="apply-btn"
                                                disabled
                                            >
                                                승인완료
                                            </Button>
                                        ) : (
                                            <></>
                                        )
                                    ) : (
                                        <Button className="apply-btn" disabled>
                                            지원불가
                                        </Button>
                                    ))}
                            </Col>
                        </Row>
                        <Row>
                            <h1>
                                <strong>{post?.title}</strong>
                            </h1>
                        </Row>
                        <Row>
                            <Col className="name">
                                <h4>{post?.captain?.name}</h4>
                            </Col>
                            <Col className="date">
                                <h4>{post?.createdAt.substr(0, 10)}</h4>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col>{showLanguage(post)}</Col>
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

                        {cmpUserAndCaptain() ? (
                            <div className="modify-post-group">
                                <div className="modify-post-btn">
                                    <Button onClick={handleToggleEditDetail}>
                                        수정하기
                                    </Button>
                                </div>
                                <div className="delete-post-btn">
                                    <Button onClick={deletePost}>삭제</Button>
                                </div>
                            </div>
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
                                    rows={1}
                                    maxLength="50"
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
                                    <div
                                        className="comment-container"
                                        key={comment.id}
                                    >
                                        {targetComment !== comment.id ? (
                                            <div>
                                                <li>{comment.content}</li>
                                            </div>
                                        ) : targetComment === comment.id ? (
                                            <>
                                                <div className="comment-input">
                                                    <Form.Control
                                                        defaultValue={
                                                            comment.content
                                                        }
                                                        ref={modifyCommentInput}
                                                    />
                                                </div>
                                                <div className="complete-modify-btn">
                                                    <button
                                                        onClick={
                                                            handleClickCommentModify
                                                        }
                                                    >
                                                        완료
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}

                                        {userState.user._id ===
                                            comment.author &&
                                        isEditComment === false ? (
                                            <>
                                                <div className="comment-btns-container">
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
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                );
                            })}
                        </ul>
                    </>
                ) : (
                    <PostForm
                        handleSubmit={handleSubmit}
                        post={post}
                        langInputValue={langInputValue}
                        setLangInputValue={setLangInputValue}
                        getLangFromDropDown={getLangFromDropDown}
                        handleToggleEditDetail={handleToggleEditDetail}
                        ref={{
                            titleRef,
                            detailRef
                        }}
                    />
                )}
            </Container>
            <ApplicantlistCanvas
                showOffcanvas={showOffApplicantscanvas}
                handleClose={handleCloseApplicantscanvas}
                list={applicants}
                handliClickAcknowledgment={handliClickAcknowledgment}
            ></ApplicantlistCanvas>
            <MemberListCanvas
                showOffcanvas={showOffMemberListcanvas}
                handleClose={handleCloseMemberListcanvas}
                list={members}
            ></MemberListCanvas>
        </>
    );
};

export default Post;
