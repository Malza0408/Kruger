import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { certificateAuthService } from '../services/certificateService';

const certificateAuthRouter = Router();

certificateAuthRouter.post(
    '/certificate/create',
    login_required,
    async (req, res, next) => {
        try {
            if (is.emptyObject(req.body)) {
                throw new Error(
                    'headers의 Content-Type을 application/json으로 설정해주세요'
                );
            }
            // login_required에서 currentUserId에 로그인 유저의 id를 넣어둠
            const user_id = req.currentUserId;
            const title = req.body.title;
            const description = req.body.description;
            const date = req.body.date;
            console.log(user_id, title, description, date);

            const newCertificate = await certificateAuthService.addCertificate({
                user_id,
                title,
                description,
                date
            });

            if (newCertificate.errorMessage) {
                throw new Error(newCertificate.errorMessage);
            }

            res.status(201).json(newCertificate);
        } catch (error) {
            next(error);
        }
    }
);

certificateAuthRouter.get(
    '/certificates/:id',
    login_required,
    async (req, res, next) => {
        try {
            const certificate_id = req.params.id;
            const currentCertificateInfo =
                await certificateAuthService.getCertificateInfo({
                    certificate_id
                });

            if (currentCertificateInfo.errorMessage) {
                throw new Error(currentCertificateInfo.errorMessage);
            }

            res.status(200).send(currentCertificateInfo);
        } catch (error) {
            next(error);
        }
    }
);

certificateAuthRouter.put(
    '/certificates/:id',
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 사용자 id를 추출함.
            const certificate_id = req.params.id;
            // body data 로부터 업데이트할 사용자 정보를 추출함.
            const title = req.body.title ?? null;
            const description = req.body.description ?? null;
            const date = req.body.date ?? null;

            const toUpdate = { title, description, date };

            // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
            const updatedCertificate =
                await certificateAuthService.setCertificate({
                    certificate_id,
                    toUpdate
                });

            if (updatedCertificate.errorMessage) {
                throw new Error(updatedCertificate.errorMessage);
            }

            res.status(200).json(updatedCertificate);
        } catch (error) {
            next(error);
        }
    }
);

certificateAuthRouter.get(
    '/certificatelist/:user_id',
    login_required,
    async function (req, res, next) {
        try {
            // 전체 사용자 목록을 얻음
            const user_id = req.params.user_id;
            const certificates = await certificateAuthService.getCertificates({
                user_id
            });
            res.status(200).send(certificates);
        } catch (error) {
            next(error);
        }
    }
);

export { certificateAuthRouter };
