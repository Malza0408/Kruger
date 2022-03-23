import React, { useState } from 'react';
import { Button, Offcanvas, Navbar, Container, Nav } from 'react-bootstrap';
import * as Api from '../../api';
const FollowingList = () => {
    const [follows, setFollows] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        const res = await Api.get('user/current').then((res) =>
            setFollows(res.data.follow)
        );
        setShow(true);
    };

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                팔로우목록
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>내가 팔로우하는 사람</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {follows.map((follow, i) => {
                        return (
                            <div key={i}>
                                <li>{follow}</li>
                            </div>
                        );
                    })}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default FollowingList;
