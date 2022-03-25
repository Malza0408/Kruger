import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
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
    }, [portfolioOwnerId]);

    const handleFollow = async () => {
        const followedId = params.userId;
        const user_id = user.id;
        try {
            await Api.put(`followUser/${params.userId}`, {
                followedId,
                user_id
            });
            await Api.get('user/current').then((res) =>
                setFollows([...res.data.follow])
            );
            alert('팔로우하셨습니다.');
        } catch (e) {
            alert('이미 팔로우 중입니다.');
        }
    };
    const handleUnfollow = async () => {
        const followedId = params.userId;
        const user_id = user.id;
        try {
            await Api.put(`unfollowUser/${params.userId}`, {
                followedId,
                user_id
            });
            await Api.get('user/current').then((res) =>
                setFollows([...res.data.follow])
            );
            alert('언팔로우하셨습니다.');
        } catch (e) {
            alert('현재 팔로우 중이 아닙니다.');
        }
    };

    return (
        <Card
            style={{ width: '18rem' }}
            className="mt-1 ms-3 mr-5 text-center followCard"
        >
            {isEditable ? (
                <Card.Body>
                    <FollowList user={user} />
                    <FollowerList user={user} />
                </Card.Body>
            ) : (
                <div>
                    <Button
                        variant="light"
                        className="follow"
                        onClick={handleFollow}
                    >
                        팔로우
                    </Button>
                    <Button
                        variant="light"
                        className="unfollow"
                        onClick={handleUnfollow}
                    >
                        언팔로우
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default Follows;
