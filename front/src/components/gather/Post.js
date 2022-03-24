import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { patch, put, get } from '../../api';

import { UserStateContext } from '../../App';

const Post = ({ post }) => {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const post_id = useParams();
    const [savePost, setSavePost] = useState(post);
    const commentRef = useRef();
    const [isLike, setIsLike] = useState(false);
    const [comments, setCommets] = useState([]);

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
        }
        console.log('post: ', post);
        console.log('user id: ', userState.user.id);
        console.log('post_id: ', post_id.id);
        if (post === undefined || post === null) {
            get('recruit', post_id.id).then((res) => {
                console.log('get 결과: ', res.data);
                setSavePost(res.data);
            });
        } else {
            setSavePost(post);
        }

        if (isLike === true) {
            console.log('좋아요 이미 누름');
            setIsLike(true);
        }
        if (isLike === false) {
            console.log('좋아요 안 누름');
            setIsLike(false);
        }

        setCommets(savePost?.comment);
    }, [isLike, navigate, post, post_id.id, userState.user]);

    const handleOnClickLike = async () => {
        try {
            if (!isLike) {
                await patch(`likedRecruit/${savePost.id}`);
                setIsLike(true);
            } else {
                await patch(`unlikedRecruit/${savePost.id}`);
                setIsLike(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleOnSubmitComment = async (e) => {
        e.preventDefault();
        const content = commentRef.current.value;
        try {
            await put(`recruit/comment/${savePost.id}`, {
                content
            });
            console.log('content: ', content);
            setCommets((current) => {
                return [...current, content];
            });
        } catch (error) {
            throw new Error(error);
        }
    };
    return (
        <Container fluid className="text-center">
            <h1>{savePost?.title}</h1>
            <h4>{savePost?.captain?.name}</h4>
            <h2>{savePost?.createdAt.substr(0, 10)}</h2>
            <h2>
                사용언어 :{' '}
                {savePost?.language?.reduce((prev, cur, index) => {
                    return prev + cur + ' ';
                }, '')}
            </h2>
            <hr />
            <pre>{savePost?.detail}</pre>
            <img
                src={`${process.env.PUBLIC_URL}/gatherImg/heart.png`}
                alt="like"
                width="20px"
                height="20px"
                className="me-1"
                onClick={handleOnClickLike}
            />
            <span className="like-count">{savePost?.like.length}</span>
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
                    return <li key={index}>{comment.content}</li>;
                })}
            </ul>{' '}
        </Container>
    );
};

export default Post;
