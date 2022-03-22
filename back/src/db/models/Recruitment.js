import { RecruitmentModel } from '../schemas/recruitment';

class Recruitment {
    static async create(newRecruitment) {
        const createdNewRecruitment = await RecruitmentModel.create(
            newRecruitment
        );
        return createdNewRecruitment;
    }

    static async findById({ recruitmentId }) {
        const recruitment = await RecruitmentModel.findOne({
            id: recruitmentId
        }).populate('captain');
        return recruitment;
    }

    static async update(id, key, value) {
        const filter = { id };
        const update = { [key]: value };
        const option = { returnOriginal: false };

        const updatedRecruitment = await RecruitmentModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedRecruitment;
    }

    static async close({ recruitmentId, nowEnrolling }) {
        await RecruitmentModel.findOneAndUpdate(
            { id: recruitmentId },
            { nowEnrolling: !nowEnrolling }
        );
        return;
    }

    static async findApplicant(applicant) {
        const isApplicant = await RecruitmentModel.findOne(applicant);
        return isApplicant;
    }

    static async addApplicant({ recruitmentId, applicant }) {
        const updatedRecruitment = await RecruitmentModel.findOneAndUpdate(
            { id: recruitmentId },
            { applicant }
        );
        return updatedRecruitment;
    }
    static async updateArray(filter, update) {
        const option = { returnOriginal: false };

        const updatedRecruitment = await RecruitmentModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedRecruitment;
    }

    static async deleteById({ recruitmentId }) {
        await RecruitmentModel.deleteOne({ id: recruitmentId });
        return;
    }
}

export { Recruitment };
