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

  static async update({ award_id, fieldToUpdate, newValue }) {
    const filter = { id: award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  static async findAllById({ user_id }) {
    const awards = await AwardModel.find({ user_id });
    return awards;
  }

}

export { Award };