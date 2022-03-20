import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { updateMiddleware } from '../middlewares/updateMiddleware';
import { CertificateService } from '../services/CertificateService';

const certificateRouter = Router();

certificateRouter.post(
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
            const { title, description, date } = req.body;
            console.log(user_id, title, description, date);

            const newCertificate = await CertificateService.addCertificate({
                user_id,
                title,
                description,
                date
            });

            res.status(201).json(newCertificate);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.get(
    '/certificatelist/:user_id',
    login_required,
    async function (req, res, next) {
        try {
            // 전체 자격증 목록을 얻음
            const user_id = req.params.user_id;
            const certificates = await CertificateService.getCertificates({
                user_id
            });
            res.status(200).send(certificates);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.get(
    '/certificates/:id',
    login_required,
    async (req, res, next) => {
        try {
            const certificate_id = req.params.id;
            const currentCertificateInfo =
                await CertificateService.getCertificateInfo({
                    certificate_id
                });

            res.status(200).send(currentCertificateInfo);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.put(
    '/certificates/:id',
    login_required,
    updateMiddleware,
    async function (req, res, next) {
        try {
            // URI로부터 자격증 id를 추출함.
            const certificate_id = req.params.id;
            const toUpdate = req.toUpdate;

            // 해당 자격증 아이디로 자격증 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
            const updatedCertificate = await CertificateService.setCertificate({
                certificate_id,
                toUpdate
            });

            res.status(200).json(updatedCertificate);
        } catch (error) {
            next(error);
        }
    }
);

certificateRouter.delete(
    '/certificates/:id',
    login_required,
    async function (req, res, next) {
        try {
            // URI로부터 자격증 id를 추출함.
            const certificate_id = req.params.id;
            await CertificateService.deleteCertificate({ certificate_id });
            console.log(certificate_id);
            res.status(200).send('삭제되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { certificateRouter };
