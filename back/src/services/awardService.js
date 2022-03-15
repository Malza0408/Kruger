import { Award, User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class awardAuthService {
  static async addAward({ user_id, title, description }) {
    // 유저 확인
    const user = await User.findById({ user_id });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewAward;
  }

  static async getAwardInfo({ award_id }) {
    const award = await Award.findById({ award_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "삭제되었거나 등록되지 않은 수상내역입니다.";
      return { errorMessage };
    }

    return award;
  }

}

export { awardAuthService };
