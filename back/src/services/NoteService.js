import { Note, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class NoteService {
    static async addNote({ user_id, to, title, content }) {
        const id = uuidv4();

        const fromUser = await User.findById({ user_id });
        const fromId = fromUser._id;

        const email = to;
        const toUser = await User.findByEmail({ email });

        if (!toUser) {
            const errorMessage =
                '쪽지 전송이 불가능합니다. 다시 시도해주세요!!';
            throw new Error(errorMessage);
        }

        const toId = toUser._id;

        const newNote = { id, fromId, toId, title, content };
        console.log(id, fromId, toId, title, content);

        const createdNewNote = await Note.create({ newNote });

        return createdNewNote;
    }

    static async getTakenNotes({ user_id }) {
        const user = await User.findById({ user_id });

        const toId = user._id;
        const notes = await Note.findAllTo({ toId });

        return notes;
    }

    static async getSentNotes({ user_id }) {
        const user = await User.findById({ user_id });

        const fromId = user._id;
        const notes = await Note.findAllFrom({ fromId });

        return notes;
    }

    static async getNoteInfo({ noteId }) {
        const note = await Note.findById({ noteId });

        if (!note) {
            const errorMessage =
                '해당 쪽지는 이미 삭제되었거나 전송된 적 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }
        console.log(note);

        return note;
    }

    static async checkNote({ noteId }) {
        await Note.updateCheck({ noteId });
        return;
    }

    static async deleteNote({ noteId }) {
        await Note.deleteById({ noteId });
        return;
    }
}

export { NoteService };
