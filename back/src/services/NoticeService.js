import { Notice, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class NoticeService {
    static async addNotice({ user_id, title, detail }) {
        const id = uuidv4();
        // title이나 detail 검증필요?
        const captain = await User.findById(user_id);
        // console.log(captain);
        const newNotice = { id, captain, title, detail };
        const createdNewNotice = await Notice.create(newNotice);
        // console.log('createdNewNotice', createdNewNotice);

        return createdNewNotice;
    }
}

export { NoticeService };
