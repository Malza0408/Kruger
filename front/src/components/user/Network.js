import React, {
    useEffect,
    useContext,
    useState,
    useMemo,
    useCallback
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Form,
    Row,
    Col,
    Dropdown,
    ButtonGroup
} from 'react-bootstrap';
import { getRegExp } from 'korean-regexp';
import * as Api from '../../api';
import UserCard from './UserCard';
import { UserStateContext } from '../../App';
import { debounce } from 'lodash';

function Network() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);

    // useState 훅을 통해 users 상태를 생성함.
    const [users, setUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [order, setOrder] = useState('정렬기준');

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
            navigate('/login');
            return;
        }
        // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
        Api.get('userlist').then((res) => setUsers(res.data));
    }, [userState, navigate]);

    const debounceSearch = useMemo(
        () =>
            debounce((e) => {
                const regexp = getRegExp(e.target.value, {
                    initialSearch: true,
                    fuzzy: true
                });

                const searchList = users.filter((user) => {
                    // console.log(user);
                    return (
                        user?.name?.match(regexp) || user?.email?.match(regexp)
                    );
                });
                setSearchUsers([...searchList]);
            }, 300),
        [users]
    );

    const handleOnChange = useCallback(
        (e) => {
            setInputValue(e.target.value);
            debounceSearch(e);
        },
        [debounceSearch]
    );

    const handleOnClickAscUser = () => {
        setOrder('이름 오름차순');
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.name < userB.name
                ? -1
                : userA.name > userB.name
                ? 1
                : 0;
        });
        console.log(ascUsers);
        setUsers([...ascUsers]);
    };

    const handleOnClickDescUser = () => {
        setOrder('이름 내림차순');
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.name < userB.name
                ? 1
                : userA.name > userB.name
                ? -1
                : 0;
        });
        console.log(ascUsers);
        setUsers([...ascUsers]);
    };

    const handleOnClickAscCreatedAt = () => {
        setOrder('포스팅 오름차순');
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.createdAt < userB.createdAt
                ? -1
                : userA.createdAt > userB.createdAt
                ? 1
                : 0;
        });
        setUsers([...ascUsers]);
    };

    const handleOnClickDescCreatedAt = () => {
        setOrder('포스팅 내림차순');
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.createdAt < userB.createdAt
                ? 1
                : userA.createdAt > userB.createdAt
                ? -1
                : 0;
        });
        setUsers([...ascUsers]);
    };

    return (
        <Container fluid className="network">
            <Row className="justify-content-md-center mb-4">
                <Col lg="3" style={{ width: '400px' }}>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Control
                            className="ms-2 filterInput"
                            type="text"
                            placeholder="입력해주세요..."
                            onChange={handleOnChange}
                            style={{ display: 'inline' }}
                        />
                    </Form>
                </Col>
                <Col>
                    <Dropdown className="ms-2" as={ButtonGroup}>
                        <button className="orderState">{order}</button>

                        <Dropdown.Toggle
                            className="orderListButton"
                            id="dropdown-basic"
                        />

                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={handleOnClickAscUser}
                                value="이름오름차순"
                            >
                                이름 오름차순
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={handleOnClickDescUser}
                                value="이름내림차순"
                            >
                                이름 내림차순
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={handleOnClickAscCreatedAt}
                                value="포스팅 오름차순"
                            >
                                포스팅 오름차순
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={handleOnClickDescCreatedAt}
                                value="포스팅 내름차순"
                            >
                                포스팅 내림차순
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row xs="auto" className="jusify-content-center">
                {inputValue === ''
                    ? users.map((user) => (
                          <UserCard key={user.id} user={user} isNetwork />
                      ))
                    : searchUsers.map((user) => (
                          <UserCard key={user.id} user={user} isNetwork />
                      ))}
            </Row>
        </Container>
    );
}

export default Network;
