import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Container, Col, Row, Form, Button } from 'react-bootstrap';
import * as Api from '../../api';
import { DispatchContext } from '../../App';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);
    //useState로 email 상태를 생성함.
    const [email, setEmail] = useState('');
    //useState로 password 상태를 생성함.
    const [password, setPassword] = useState('');
    //useState로 login 실패 여부를 판단함.
    const [isLoginFail, setIsLoginFail] = useState(false);

    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = (email) => {
        return email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // 비밀번호가 4글자 이상인지 여부를 확인함.
    const validatePassword = (password) => {
        return password.length >= 4;
    };

    //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
    const isEmailValid = validateEmail(email);
    //위 validateEmail 함수를 통해 패스워드 형태 적합 여부를 확인함.
    const isPasswordValid = validatePassword(password);
    // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
    const isFormValid = isEmailValid && isPasswordValid;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // "user/login" 엔드포인트로 post요청함.
            const res = await Api.post('user/login', {
                email,
                password
            });
            // 유저 정보는 response의 data임.
            const user = res.data;
            // JWT 토큰은 유저 정보의 token임.
            const jwtToken = user.token;
            // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
            sessionStorage.setItem('userToken', jwtToken);
            // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: user
            });

            // 기본 페이지로 이동함.
            // navigate('/', { replace: true });
            window.location.replace('/')

        } catch (err) {
            setIsLoginFail(true);
            console.log('로그인에 실패하였습니다.\n', err);
        }
    };

    const handleOnClickGithub = async () => {
        await Api.get(
            `${uri}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`
        ).then((res) => console.log(res));
    };
    const handleOnClickGoogle = async () => {
        await Api.get('auth/google').then((res) => console.log(res));
    };
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = 'http://localhost:5000/auth/github/callback';
    const uri = 'https://github.com/login/oauth/authorize';

    return (
        <div className="login">
            <Row>
                <Col className="text-center">
                    <Image
                        className="mx-auto loginImage"
                        src={`${process.env.PUBLIC_URL}/img/main.png`}
                        alt="First slide"
                    />
                </Col>
            </Row>

            <Container>
                <Row className="justify-content-md-center pt-5 pb-5">
                    <Col lg={4}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="loginEmail">
                                <Form.Label>이메일 주소</Form.Label>
                                <Form.Control
                                    className="loginInput"
                                    type="email"
                                    autoComplete="on"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {!isEmailValid && (
                                    <Form.Text className="text-success">
                                        이메일 형식이 올바르지 않습니다.
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group
                                controlId="loginPassword"
                                className="mt-3"
                            >
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control
                                    className="passwordInput"
                                    type="password"
                                    autoComplete="on"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                {!isPasswordValid && (
                                    <Form.Text className="text-success">
                                        비밀번호는 4글자 이상입니다.
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group as={Row} className="mt-3 text-center">
                                {isLoginFail && (
                                    <Form.Text className="text-danger">
                                        이메일 또는 비밀번호를 잘못
                                        입력했습니다.
                                    </Form.Text>
                                )}

                                <Button
                                    variant="light"
                                    type="submit"
                                    disabled={!isFormValid}
                                    className="loginButton mx-auto"
                                >
                                    로그인
                                </Button>
                            </Form.Group>
                            <Form.Group as={Row} className="mt-3 text-center">
                                <Col>
                                    <Button
                                        variant="light"
                                        onClick={() => navigate('/register')}
                                        className="registerButton"
                                    >
                                        비밀번호 찾기
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        variant="light"
                                        onClick={() => navigate('/register')}
                                        className="registerButton"
                                    >
                                        회원가입하기
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Col sm={{ span: 20 }}></Col>
                        </Form>
                    </Col>
                    <Col md={0} lg={2}></Col>
                    <Col sm={6} md={6} lg={4}>
                        <Row className="mt-5 mb-4">
                            <a
                                href={`${uri}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`}
                                onClick={handleOnClickGithub}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/github.png`}
                                    alt=""
                                    // onClick={handleOnClickGithub}
                                    className="githubLogin"
                                />
                            </a>
                        </Row>
                        <Row>
                            <a>
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/google.png`}
                                    alt=""
                                    onClick={handleOnClickGoogle}
                                    className="googleLogin"
                                />
                            </a>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LoginForm;
