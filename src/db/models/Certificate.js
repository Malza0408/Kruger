import { CertificateModel } from '../schemas/certificate';

class Certificate {
    // 새로운 자격증 요소 작성, 자격증과 관련된 내용 필요
    static async create({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(
            newCertificate
        );
        return createdNewCertificate;
    }

    // 같은 user_id를 가진 모든 자격증 요소들을 불러옴
    static async findAll({ user_id }) {
        const certificates = await CertificateModel.find({ user_id });
        return certificates;
    }

    // id를 통해 해당 자격증 요소를 가져옴
    static async findById({ certificate_id }) {
        const certificate = await CertificateModel.findOne({
            id: certificate_id
        });
        return certificate;
    }

    // id를 통해 해당 자격증 요소를 수정함
    static async update(certificate_id, key, value) {
        const filter = { id: certificate_id };
        const update = { [key]: value };
        const option = { returnOriginal: false };

        const updatedCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedCertificate;
    }

    // id를 통해 해당 자격증 요소를 삭제함
    static async deleteById({ certificate_id }) {
        await CertificateModel.deleteOne({ id: certificate_id });
        return;
    }
}

export { Certificate };
