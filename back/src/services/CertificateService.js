import { Certificate, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';
import { format } from 'express/lib/response';

class CertificateService {
    // 자격증 생성
    static async addCertificate({ user_id, title, description, date }) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newCertificate = { id, user_id, title, description, date };

        // db에 저장
        const createdNewCertificate = await Certificate.create({
            newCertificate
        });

        return createdNewCertificate;
    }

    // 자격증 목록 보기
    static async getCertificates({ user_id }) {
        const certificates = await Certificate.findAll({ user_id });
        return certificates;
    }

    // 자격증 1개 보기
    static async getCertificateInfo({ certificate_id }) {
        // 해당 id의 자격증이 db에 존재하는지 확인
        const certificate = await Certificate.findById({ certificate_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!certificate) {
            const errorMessage = '삭제되었거나 등록되지 않은 자격증입니다.';
            throw new Error(errorMessage);
        }

        return certificate;
    }

    // 자격증 수정하기
    static async setCertificate({ certificate_id, user_id, toUpdate }) {
        // 해당 id의 자격증이 db에 존재하는지 확인
        let certificate = await Certificate.findById({ certificate_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!certificate) {
            const errorMessage = '삭제되었거나 등록되지 않은 자격증입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 자격증 생성자인지 확인
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

    // 자격증 삭제하기
    static async deleteCertificate({ certificate_id, user_id }) {
        // 해당 id의 자격증이 db에 존재하는지 확인
        const certificate = await Certificate.findById({ certificate_id });

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!certificate) {
            const errorMessage = '삭제되었거나 등록되지 않은 자격증입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 자격증 생성자인지 확인
        if (certificate.user_id !== user_id) {
            const errorMessage = '삭제할 수 없습니다.';
            throw new Error(errorMessage);
        }
        await Certificate.deleteById({ certificate_id });
        return;
    }
}

export { CertificateService };
