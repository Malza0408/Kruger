import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { patch, put, get } from '../../api';
import { UserStateContext } from '../../App';

const Post = () => {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const post_id = useParams();
    const [post, setPost] = useState();
    const commentRef = useRef();
    const [isLike, setIsLike] = useState(false);
    const [isEditComment, setIsEditComment] = useState(false);
    const [comments, setComments] = useState([]);

    const handleOnClickLike = async () => {
        try {
            if (
                post.like.find((id) => id === userState.user.id) === undefined
            ) {
                await patch(`likedRecruit/${post.id}`);
                getPostDataWithoutComment();
            } else {
                await patch(`unlikedRecruit/${post.id}`);
                getPostDataWithoutComment();
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const getPostData = useCallback(async () => {
        const result = await get('recruit', post_id.id);
        setPost(result.data);
        setComments(result.data.comment);
    }, [post_id.id]);

    const getPostDataWithoutComment = useCallback(async () => {
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
            getPostData();
            commentRef.current.value = '';
        } catch (error) {
            throw new Error(error);
        }
    };
    const handleOnClickDelete = (commentId) => {
        return async () => {
            try {
                await patch(`recruit/delete/${post.id}/${commentId}`);
                getPostData();
            } catch (error) {
                throw new Error(error);
            }
        };
    };

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
        }
        getPostData();
    }, [getPostData, navigate, userState.user]);
    return (
        <Container fluid className="text-center">
            <h1>{post?.title}</h1>
            <h4>{post?.captain?.name}</h4>
            <h2>{post?.createdAt.substr(0, 10)}</h2>
            <h2>
                사용언어 :{' '}
                {post?.language?.reduce((prev, cur, index) => {
                    return prev + cur + ' ';
                }, '')}
            </h2>
            <hr />
            <pre>{post?.detail}</pre>
            <img
                src={`${process.env.PUBLIC_URL}/gatherImg/heart.png`}
                alt="like"
                width="20px"
                height="20px"
                className="me-1"
                onClick={handleOnClickLike}
            />
            <span className="like-count">{post?.like.length}</span>
            <Form onSubmit={handleOnSubmitComment}>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    style={{ maxWidth: '900px', margin: 'auto' }}
                >
                    <Form.Label>댓글</Form.Label>
                    <Form.Control
                        placeholder="댓글을 입력하세요."
                        as="textarea"
                        rows={4}
                        ref={commentRef}
                    />
                </Form.Group>
                <Button type="submit">댓글 등록</Button>
            </Form>
            <ul>
                {comments?.map((comment, index) => {
                    return (
                        <Row>
                            <Col>
                                {isEditComment ?? (
                                    <li key={index}>{comment.content}</li>
                                )}
                            </Col>
                            <Col>
                                <Button
                                    onClick={() =>
                                        setIsEditComment(!isEditComment)
                                    }
                                >
                                    수정
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    onClick={handleOnClickDelete(comment.id)}
                                >
                                    삭제
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
            </ul>
        </Container>
    );
};

export default Post;
