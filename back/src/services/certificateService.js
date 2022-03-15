import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class certificateAuthService {
  static async addCertificate({ user_id, title, description, date }) {

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newCertificate = { id, user_id, title, description, date };

    console.log(newCertificate)

    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }


}

export { certificateAuthService };
