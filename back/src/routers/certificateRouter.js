import is from '@sindresorhus/is';
import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { profileUpdateMiddleware } from '../middlewares/profileUpdateMiddleware';
import { CertificateService } from '../services/CertificateService';

const certificateRouter = Router();

// 새로운 자격증 요소 추가
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
            const user_id = req.currentUserId;
            const { title, description, date } = req.body;

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

// 사용자의 자격증 목룍을 가져옴
certificateRouter.get(
    '/certificatelist/:user_id',
    login_required,
    async function (req, res, next) {
        try {
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

// 해당 자격증 요소의 정보를 가져옴
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

// 해당 자격증 요소 수정
certificateRouter.put(
    '/certificates/:id',
    login_required,
    profileUpdateMiddleware,
    async function (req, res, next) {
        try {
            const certificate_id = req.params.id;
            const user_id = req.currentUserId;
            const toUpdate = req.body;

            const updatedCertificate = await CertificateService.setCertificate({
                certificate_id,
                user_id,
                toUpdate
            });

            res.status(200).json(updatedCertificate);
        } catch (error) {
            next(error);
        }
    }
);

// 해당 자격증 요소 삭제
certificateRouter.delete(
    '/certificates/:id',
    login_required,
    async function (req, res, next) {
        try {
            const certificate_id = req.params.id;
            const user_id = req.currentUserId;
            await CertificateService.deleteCertificate({
                certificate_id,
                user_id
            });
            res.status(200).send('삭제되었습니다.');
        } catch (error) {
            next(error);
        }
    }
);

export { certificateRouter };
