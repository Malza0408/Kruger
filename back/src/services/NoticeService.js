import { Notice, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class NoticeService {
    static async setNotice({ noticeId, user_id, toUpdate }) {
        let notice = await Notice.findById({ noticeId });

        if (!notice) {
            const errorMessage = '삭제되었거나 등록되지 않은 게시물입니다.';
            throw new Error(errorMessage);
        }

        if (notice.captain.id !== user_id) {
            const errorMessage = '수정할 수 없습니다.';
            throw new Error(errorMessage);
        }

        const keys = Object.keys(toUpdate);
        const values = Object.values(toUpdate);

        for (let i = 0; i < keys.length; i++) {
            notice = await Notice.update(noticeId, keys[i], values[i]);
            console.log(keys[i], values[i]);
        }

        return notice;
    }
    
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
