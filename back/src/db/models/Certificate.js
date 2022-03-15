import { CertificateModel } from "../schemas/certificate";

class Certificate {
    // 새로운 자격증 요소 작성, 자격증과 관련된 내용 필요 
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

}


export { Certificate };