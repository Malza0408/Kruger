import cors from 'cors';
import express from 'express';
import { userRouter } from './routers/userRouter';
import { educationRouter } from './routers/educationRouter';
import { awardRouter } from './routers/awardRouter';
import { certificateRouter } from './routers/certificateRouter';
import { projectRouter } from './routers/projectRouter';
import { noteRouter } from './routers/noteRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { authRouter } from './routers/authRouter';
import { recruitmentRouter } from './routers/recruitmentRouter';
import path from 'path';

const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userRouter);
app.use(authRouter);
app.use(educationRouter);
app.use(awardRouter);
app.use(certificateRouter);
app.use(projectRouter);
app.use(noteRouter);
app.use(recruitmentRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, '../front', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front', 'build', 'index.html'));
});
export { app };
