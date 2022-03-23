import { RecruitmentModel } from '../schemas/recruitment';
const option = { returnOriginal: false };
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

    static async findAll() {
        const recruitments = await RecruitmentModel.find({});
        return recruitments;
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

    static async toggle({ recruitmentId, nowEnrolling }) {
        const updatedRecruitment = await RecruitmentModel.findOneAndUpdate(
            { id: recruitmentId },
            { nowEnrolling: !nowEnrolling },
            { new: true }
        );
        return updatedRecruitment;
    }

    static async findApplicant({ recruitmentId, applicant }) {
        const recruitment = await RecruitmentModel.findOne({
            id: recruitmentId,
            applicant: applicant
        }).populate('applicant');
        return recruitment;
    }

    static async addApplicant({ recruitmentId, applicant }) {
        const updatedRecruitment = await RecruitmentModel.findOneAndUpdate(
            { id: recruitmentId },
            { $addToSet: { applicant: applicant } },
            { returnDocument: 'after' }
        ).populate('applicant');
        return updatedRecruitment;
    }

    static async findAuthor({ recruitmentId }) {
        const recruitment = await RecruitmentModel.findOne({
            id: recruitmentId
        }).populate('Comment.author');
    }

    static async updateComment({ recruitmentId, author, toUpdate }) {
        const option = { returnOriginal: false };

        const updatedRecruitment = await RecruitmentModel.findOneAndUpdate(
            { id: recruitmentId },
            { Comment: { author, content: toUpdate.content } },
            option
        );
        return updatedRecruitment;
    }

    static async deleteComment({ recruitmentId, authorId }) {
        await RecruitmentModel.findOneAndUpdate(
            { id: recruitmentId },
            {
                Comment: {
                    author: { id: authorId }
                }
            }
        );
        return;
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
