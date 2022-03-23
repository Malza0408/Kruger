import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import FollowList from './FollowList';
import FollowerList from './FollowerList';
import { useParams } from 'react-router-dom';
import * as Api from '../../api';

const Follows = ({ portfolioOwnerId, isEditable }) => {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [follows, setFollows] = useState([]);

    useEffect(() => {
        Api.get('users', portfolioOwnerId).then((res) => setUser(res.data));
    }, []);

    const handleFollow = async () => {
        const followedId = params.userId;
        const user_id = user.id;
        await Api.put(`followUser/${params.userId}`, {
            followedId,
            user_id
        });
        await Api.get('user/current').then((res) =>
            setFollows([...res.data.follow])
        );
        alert('팔로우하셨습니다.');
    };
    const handleUnfollow = async () => {
        const followedId = params.userId;
        const user_id = user.id;
        await Api.put(`unfollowUser/${params.userId}`, {
            followedId,
            user_id
        });
        await Api.get('user/current').then((res) =>
            setFollows([...res.data.follow])
        );
        alert('언팔로우하셨습니다.');
    };

    return (
        <Row style={{ width: '18rem' }} className="mb-2 ms-3 mr-5 text-center">
            {isEditable ? (
                <Row>
                    <Col>
                        <FollowList user={user} />
                    </Col>
                    <Col>
                        <FollowerList user={user} />
                    </Col>
                </Row>
            ) : (
                <div>
                    <Button onClick={handleFollow}>팔로우</Button>
                    <Button onClick={handleUnfollow}>언팔로우</Button>
                </div>
            )}
        </Row>
    );
};

export default Follows;
