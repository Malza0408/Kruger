import { NoticeModel } from '../schemas/notice';
import { UserModel } from '../schemas/user';

class Notice {
    static async create(newNotice) {
        const createdNewNotice = await NoticeModel.create(newNotice);
        return createdNewNotice;
    }
}

export { Notice };
