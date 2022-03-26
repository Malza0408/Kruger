import { Form } from 'react-bootstrap';

const Comments = ({
    comments,
    targetComment,
    modifyCommentInput,
    handleClickCommentModify,
    userState,
    isEditComment,
    handleClickModifyComment,
    handleClickDeleteComment
}) => {
    return (
        <ul>
            {comments?.map((comment) => {
                return (
                    <div className="comment-container" key={comment.id}>
                        {targetComment !== comment.id ? (
                            <div>
                                <li>{comment.content}</li>
                            </div>
                        ) : targetComment === comment.id ? (
                            <>
                                <div className="comment-input">
                                    <Form.Control
                                        defaultValue={comment.content}
                                        ref={modifyCommentInput}
                                    />
                                </div>
                                <div className="complete-modify-btn">
                                    <button onClick={handleClickCommentModify}>
                                        완료
                                    </button>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}

                        {userState.user._id === comment.author &&
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
    );
};

export default Comments;
