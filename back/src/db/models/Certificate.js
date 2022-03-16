import { CertificateModel } from '../schemas/certificate';

class Certificate {
    // 새로운 자격증 요소 작성, 자격증과 관련된 내용 필요
    static async create({ newCertificate }) {
        const createdNewCertificate = await CertificateModel.create(
            newCertificate
        );
        return createdNewCertificate;
    }

    static async findById({ certificate_id }) {
        const certificate = await CertificateModel.findOne({
            id: certificate_id
        });
        return certificate;
    }

    static async update({ certificate_id, fieldToUpdate, newValue }) {
        const filter = { id: certificate_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedCertificate = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedCertificate;
    }

    static async findAllById({ user_id }) {
        const certificates = await CertificateModel.find({ user_id });
        return certificates;
    }
}

export { Certificate };
