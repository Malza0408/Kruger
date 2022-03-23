import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import FollowList from './FollowList';
import { useParams } from 'react-router-dom';
import * as Api from '../../api';

const Follows = ({ portfolioOwnerId }) => {
    const params = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        Api.get('users', portfolioOwnerId).then((res) => setUser(res.data));
    }, [portfolioOwnerId]);

    const handleFollow = async () => {
        const followedId = params.userId;
        const user_id = user.id;
        Api.put(`followUser/${params.userId}`, {
            followedId,
            user_id
        });
        alert('팔로우하셨습니다.');
    };
    const handleUnfollow = async () => {
        const followedId = params.userId;
        const user_id = user.id;
        Api.put(`unfollowUser/${params.userId}`, {
            followedId,
            user_id
        });
        alert('언팔로우하셨습니다.');
    };

    return (
        <Row style={{ width: '18rem' }} className="mb-2 ms-3 mr-5 text-center">
            {params.userId !== undefined ? null : <FollowList />}
            {params.userId !== undefined ? (
                <div>
                    <Button onClick={handleFollow}>팔로우</Button>
                    <Button onClick={handleUnfollow}>언팔로우</Button>
                </div>
            ) : null}
        </Row>
    );
};

export default Follows;
