import { TakenNote, SentNote, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class NoteService {
    // 쪽지 생성하기
    static async addNote({ user_id, to, title, content }) {
        // to에 @가 있으면 email로 찾고 없으면 name으로 찾기
        let toUser;
        if (to.indexOf('@') !== -1) {
            toUser = await User.findByEmail({ email: to });
        } else {
            toUser = await User.findById(to);
        }

        if (!toUser) {
            const errorMessage =
                '쪽지 전송이 불가능합니다. 다시 시도해주세요!!';
            throw new Error(errorMessage);
        }

        // 보낸쪽지, 받은쪽지 생성
        const id = uuidv4();
        const fromUser = await User.findById(user_id);
        const newNote = { id, fromUser, toUser, title, content };

        const createdNewSentNote = await SentNote.create({ newNote });
        const createdNewTakenNote = await TakenNote.create({ newNote });

        // id, name, email 외 데이터 정제
        if (createdNewSentNote) {
            const { name, email, id, ...restUser } =
                createdNewSentNote.fromUser._doc;
            createdNewSentNote.fromUser._doc = { name, email, id };
        }

        if (createdNewSentNote) {
            const { name, email, id, ...restUser } =
                createdNewSentNote.toUser._doc;
            createdNewSentNote.toUser._doc = { name, email, id };
        }
        return createdNewSentNote;
    }

    // 쪽지 전체 목록 보기
    static async getNotes({ user_id }) {
        const user = await User.findById(user_id);

        // 받은 쪽지에서 데이터 정제하기
        const takenNotes = await TakenNote.findAll(user._id);
        for (let i = 0; i < takenNotes.length; i++) {
            const { name, email, id, ...restUser } = takenNotes[i].toUser._doc;
            takenNotes[i].toUser._doc = { name, email, id };

            // 탈퇴한 회원인지 확인
            if (takenNotes[i].fromUser === null) {
                takenNotes[i].fromUser = {
                    name: '탈퇴한 회원',
                    email: '탈퇴한 회원입니다.'
                };
            } else {
                // id, name, email 외 데이터 정제
                const { name, email, id, ...restUser } =
                    takenNotes[i].fromUser._doc;
                takenNotes[i].fromUser._doc = { name, email, id };
            }
        }

        // 보낸 쪽지에서 데이터 정제하기
        const sentNotes = await SentNote.findAll(user._id);
        for (let i = 0; i < sentNotes.length; i++) {
            const { name, email, id, ...restUser } = sentNotes[i].fromUser._doc;
            sentNotes[i].fromUser._doc = { name, email, id };

            // 탈퇴한 회원인지 확인
            if (sentNotes[i].toUser === null) {
                sentNotes[i].toUser = {
                    name: '탈퇴한 회원',
                    email: '탈퇴한 회원입니다.'
                };
            } else {
                // id, name, email 외 데이터 정제
                const { name, email, id, ...restUser } =
                    sentNotes[i].toUser._doc;
                sentNotes[i].toUser._doc = { name, email, id };
            }
        }

        const notes = [...takenNotes, ...sentNotes];

        return notes;
    }

    // 받은 쪽지 목록 보기
    static async getTakenNotes({ user_id }) {
        // 받은쪽지 목록 가져오기
        const user = await User.findById(user_id);
        const takenNotes = await TakenNote.findAll(user._id);

        for (let i = 0; i < takenNotes.length; i++) {
            const { name, email, id, ...restUser } = takenNotes[i].toUser._doc;
            takenNotes[i].toUser._doc = { name, email, id };

            // 탈퇴한 회원인지 확인
            if (takenNotes[i].fromUser === null) {
                takenNotes[i].fromUser = {
                    name: '탈퇴한 회원',
                    email: '탈퇴한 회원입니다.'
                };
            } else {
                // id, name, email 외 데이터 정제
                const { name, email, id, ...restUser } =
                    takenNotes[i].fromUser._doc;
                takenNotes[i].fromUser._doc = { name, email, id };
            }
        }

        return takenNotes;
    }

    // 보낸 쪽지 목록 보기
    static async getSentNotes({ user_id }) {
        // 보낸쪽지 목록 가져오기
        const user = await User.findById(user_id);
        const sentNotes = await SentNote.findAll(user._id);

        for (let i = 0; i < sentNotes.length; i++) {
            const { name, email, id, ...restUser } = sentNotes[i].fromUser._doc;
            sentNotes[i].fromUser._doc = { name, email, id };

            // 탈퇴한 회원인지 확인
            if (sentNotes[i].toUser === null) {
                sentNotes[i].toUser = {
                    name: '탈퇴한 회원',
                    email: '탈퇴한 회원입니다.'
                };
            } else {
                // id, name, email 외 데이터 정제
                const { name, email, id, ...restUser } =
                    sentNotes[i].toUser._doc;
                sentNotes[i].toUser._doc = { name, email, id };
            }
        }

        return sentNotes;
    }

    // 받은 쪽지 1개 보기
    static async getTakenNoteInfo({ noteId, user_id }) {
        // 쪽지가 있는지 확인
        const note = await TakenNote.findById({ noteId });
        if (!note) {
            const errorMessage =
                '해당 쪽지는 이미 삭제되었거나 전송된 적 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }
        // 유저가 쪽지 받은사람인지 확인
        if (note.toUser.id !== user_id) {
            const errorMessage = '접근 권한이 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        // id, name, email 외 데이터 정제
        const { name, email, id, ...restUser } = note.toUser._doc;
        note.toUser._doc = { name, email, id };

        // 탈퇴한 회원인지 확인
        if (note.fromUser === null) {
            note.fromUser = {
                name: '탈퇴한 회원',
                email: '탈퇴한 회원입니다.'
            };
        } else {
            // id, name, email 외 데이터 정제
            const { name, email, id, ...restUser } = note.fromUser._doc;
            note.fromUser._doc = { name, email, id };
        }

        return note;
    }

    // 보낸 쪽지 1개 보기
    static async getSentNoteInfo({ noteId, user_id }) {
        // 쪽지가 있는지 확인
        const note = await SentNote.findById({ noteId });
        if (!note) {
            const errorMessage =
                '해당 쪽지는 이미 삭제되었거나 전송된 적 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 쪽지 보낸사람인지 확인
        if (note.fromUser.id !== user_id) {
            const errorMessage = '접근 권한이 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        // id, name, email 외 데이터 정제
        const { name, email, id, ...restUser } = note.fromUser._doc;
        note.fromUser._doc = { name, email, id };

        // 탈퇴한 회원인지 확인
        if (note.toUser === null) {
            note.toUser = {
                name: '탈퇴한 회원',
                email: '탈퇴한 회원입니다.'
            };
        } else {
            // id, name, email 외 데이터 정제
            const { name, email, id, ...restUser } = note.toUser._doc;
            note.toUser._doc = { name, email, id };
        }

        return note;
    }

    // 읽음 처리
    static async checkNote({ noteId }) {
        await TakenNote.updateCheck({ noteId });
        return;
    }

    // 받은 쪽지 삭제
    static async deleteTakenNote({ noteId, user_id }) {
        // 쪽지가 있는지 확인
        const note = await TakenNote.findById({ noteId });
        if (!note) {
            const errorMessage =
                '해당 쪽지는 이미 삭제되었거나 전송된 적 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 쪽지 받은사람인지 확인
        if (note.toUser.id !== user_id) {
            const errorMessage = '삭제할 수 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        await TakenNote.deleteById({ noteId });
        return;
    }

    // 보낸 쪽지 삭제
    static async deleteSentNote({ noteId, user_id }) {
        // 쪽지가 있는지 확인
        const note = await SentNote.findById({ noteId });
        if (!note) {
            const errorMessage =
                '해당 쪽지는 이미 삭제되었거나 전송된 적 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        // 유저가 쪽지 보낸사람인지 확인
        if (note.fromUser.id !== user_id) {
            const errorMessage = '삭제할 수 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        await SentNote.deleteById({ noteId });
        return;
    }
}

export { NoteService };
