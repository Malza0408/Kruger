import { AwardModel } from "../schemas/award";

class Award {
    // 새로운 수상 요소 작성, 수상과 관련된 내용 필요 
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ award_id }) {
    const award = await AwardModel.findOne({ id: award_id });
    return award;
  }

}

export { Award };