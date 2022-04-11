import { AwardModel } from '../schemas/award';

class Award {
    // 새로운 수상 요소 작성, 수상과 관련된 내용 필요
    static async create({ newAward }) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }

    // 같은 user_id를 가진 모든 수상 요소들을 불러옴
    static async findAll({ user_id }) {
        const awards = await AwardModel.find({ user_id });
        return awards;
    }

    // id를 통해 해당 수상 요소를 가져옴
    static async findById({ award_id }) {
        const award = await AwardModel.findOne({ id: award_id });
        return award;
    }

    // id를 통해 해당 수상 요소를 수정함
    static async update(award_id, key, value) {
        const filter = { id: award_id };
        const update = { [key]: value };
        const option = { returnOriginal: false };

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedAward;
    }

    // id를 통해 해당 수상 요소를 삭제함
    static async deleteById({ award_id }) {
        await AwardModel.deleteOne({ id: award_id });
        return;
    }
}

export { Award };
