import React, {
    useEffect,
    useContext,
    useState,
    useMemo,
    useCallback
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
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
                    return user.name.match(regexp) || user.email.match(regexp);
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
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.name < userB.name
                ? -1
                : userA.name > userB.name
                ? 1
                : 0;
        });
        setUsers([...ascUsers]);
    };

    const handleOnClickDescUser = () => {
        const ascUsers = [...users];
        ascUsers.sort((userA, userB) => {
            return userA.name < userB.name
                ? 1
                : userA.name > userB.name
                ? -1
                : 0;
        });
        setUsers([...ascUsers]);
    };

    const handleOnClickAscCreatedAt = () => {
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
        <Container fluid>
            <Row className="justify-content-md-center mb-4">
                <Col md="auto" style={{ width: '400px' }}>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Control
                            type="text"
                            placeholder="입력해주세요..."
                            onChange={handleOnChange}
                            style={{ display: 'inline' }}
                        />
                    </Form>
                    <Button
                        variant="primary"
                        onClick={handleOnClickAscUser}
                        value="이름오름차순"
                        className="me-3"
                    >
                        이름 오름차순
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOnClickDescUser}
                        value="이름내름차순"
                        className="me-3"
                    >
                        이름 내름차순
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOnClickAscCreatedAt}
                        value="포스팅 오름차순"
                        className="me-3"
                    >
                        포스팅 오름차순
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleOnClickDescCreatedAt}
                        value="포스팅 내름차순"
                        className="me-3"
                    >
                        포스팅 내림차순
                    </Button>
                </Col>
            </Row>
            <Row xs="auto" className="jusify-content-center">
                {searchUsers?.length === 0 && inputValue === ''
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
