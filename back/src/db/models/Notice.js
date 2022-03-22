import { NoticeModel } from '../schemas/notice';

class Notice {
    static async findById({ noticeId }) {
        const notice = await NoticeModel.find({ id: noticeId });
        return notice;
    }

    static async update(noticeId, key, value) {
        const filter = { id: noticeId };
        const update = { [key]: value };
        const option = { returnOriginal: false };

        const updatedNotice = await NoticeModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedNotice;
    }
}

export { Notice };
