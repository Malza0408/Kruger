import { Certificate, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';
import { format } from 'express/lib/response';

class CertificateService {
    static async addCertificate({ user_id, title, description, date }) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newCertificate = { id, user_id, title, description, date };

        console.log(newCertificate);

        // db에 저장
        const createdNewCertificate = await Certificate.create({
            newCertificate
        });

        return createdNewCertificate;
    }

    static async getCertificates({ user_id }) {
        const certificates = await Certificate.findAll({ user_id });
        return certificates;
    }

    static async getCertificateInfo({ certificate_id }) {
        const certificate = await Certificate.findById({ certificate_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!certificate) {
            const errorMessage = '삭제되었거나 등록되지 않은 자격증입니다.';
            throw new Error(errorMessage);
        }

        return certificate;
    }

    static async setCertificate({ certificate_id, user_id, toUpdate }) {
        // 우선 해당 id 의 수상내역이 db에 존재하는지 여부 확인
        let certificate = await Certificate.findById({ certificate_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!certificate) {
            const errorMessage = '삭제되었거나 등록되지 않은 자격증입니다.';
            throw new Error(errorMessage);
        }

        if (certificate.user_id !== user_id) {
            const errorMessage = '수정할 수 없습니다.';
            throw new Error(errorMessage);
        }

        const keys = Object.keys(toUpdate);
        const values = Object.values(toUpdate);

        // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
        for (let i = 0; i < keys.length; i++) {
            certificate = await Certificate.update(
                certificate_id,
                keys[i],
                values[i]
            );
        }

        return certificate;
    }

    static async deleteCertificate({ certificate_id, user_id }) {
        const certificate = await Certificate.findById({ certificate_id });

        if (!certificate) {
            const errorMessage = '삭제되었거나 등록되지 않은 자격증입니다.';
            throw new Error(errorMessage);
        }

        if (certificate.user_id !== user_id) {
            const errorMessage = '삭제할 수 없습니다.';
            throw new Error(errorMessage);
        }
        await Certificate.deleteById({ certificate_id });
        return;
    }
}

export { CertificateService };
