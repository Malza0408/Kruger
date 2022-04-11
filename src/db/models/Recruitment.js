import { RecruitmentModel } from '../schemas/recruitment';

class Recruitment {
    // 새로운 게시물 작성, 게시물과 관련된 내용 필요
    static async create(newRecruitment) {
        const createdNewRecruitment = await RecruitmentModel.create(
            newRecruitment
        );
        return createdNewRecruitment;
    }

    // id를 통해 해당 게시물을 가져옴
    static async findById({ recruitmentId }) {
        const recruitment = await RecruitmentModel.findOne({
            id: recruitmentId
        })
            .populate('captain')
            .populate('applicant')
            .populate('member');
        return recruitment;
    }

    // 모든 게시물을 가져옴
    static async findAll() {
        const recruitments = await RecruitmentModel.find({});
        return recruitments;
    }

    // id를 통해 해당 게시물을 수정함
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

    // 현재 모집여부를 수정함
    static async toggle({ recruitmentId, nowEnrolling }) {
        const updatedRecruitment = await RecruitmentModel.findOneAndUpdate(
            { id: recruitmentId },
            { nowEnrolling: !nowEnrolling },
            { new: true }
        );
        return updatedRecruitment;
    }

    // 지원자 리스트에 현재 유저를 추가함
    static async addApplicant({ recruitmentId, applicant }) {
        const updatedRecruitment = await RecruitmentModel.findOneAndUpdate(
            { id: recruitmentId },
            { $addToSet: { applicant: applicant } },
            { returnDocument: 'after' }
        ).populate('applicant');
        return updatedRecruitment;
    }

    // 댓글 작성자를 찾음
    static async findAuthor({ recruitmentId }) {
        const recruitment = await RecruitmentModel.findOne({
            id: recruitmentId
        }).populate('comment.author');
        return recruitment;
    }

    // db에 배열로 정의된 요소들(지원자, 멤버 등)을 수정함
    static async updateArray(filter, update) {
        const option = { returnOriginal: false };

        const updatedRecruitment = await RecruitmentModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedRecruitment;
    }

    // id를 통해 해당 게시물을 삭제함
    static async deleteById({ recruitmentId }) {
        await RecruitmentModel.deleteOne({ id: recruitmentId });
        return;
    }
}

export { Recruitment };
