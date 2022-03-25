import { TakenNote, SentNote, User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class NoteService {
    static async addNote({ user_id, to, title, content }) {
        const id = uuidv4();

        const fromUser = await User.findById(user_id);

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

        const newNote = { id, fromUser, toUser, title, content };
        console.log(id, fromUser, toUser, title, content);

        const createdNewSentNote = await SentNote.create({ newNote });
        const createdNewTakenNote = await TakenNote.create({ newNote });
        console.log(createdNewTakenNote);

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

    static async getNotes({ user_id }) {
        const user = await User.findById(user_id);
        const takenNotes = await TakenNote.findAll(user._id);
        console.log(takenNotes.length);
        for (let i = 0; i < takenNotes.length; i++) {
            const { name, email, id, ...restUser } = takenNotes[i].toUser._doc;
            takenNotes[i].toUser._doc = { name, email, id };

            if (takenNotes[i].fromUser === null) {
                takenNotes[i].fromUser = {
                    name: '탈퇴한 회원',
                    email: '탈퇴한 회원입니다.'
                };
            } else {
                const { name, email, id, ...restUser } =
                    takenNotes[i].fromUser._doc;
                takenNotes[i].fromUser._doc = { name, email, id };
            }
        }

        const sentNotes = await SentNote.findAll(user._id);
        console.log(sentNotes.length);

        for (let i = 0; i < sentNotes.length; i++) {
            const { name, email, id, ...restUser } = sentNotes[i].fromUser._doc;
            sentNotes[i].fromUser._doc = { name, email, id };

            if (sentNotes[i].toUser === null) {
                sentNotes[i].toUser = {
                    name: '탈퇴한 회원',
                    email: '탈퇴한 회원입니다.'
                };
            } else {
                const { name, email, id, ...restUser } =
                    sentNotes[i].toUser._doc;
                sentNotes[i].toUser._doc = { name, email, id };
            }
        }

        const notes = [...takenNotes, ...sentNotes];

        return notes;
    }

    static async getTakenNotes({ user_id }) {
        const user = await User.findById(user_id);
        const takenNotes = await TakenNote.findAll(user._id);
        console.log(takenNotes.length);
        for (let i = 0; i < takenNotes.length; i++) {
            const { name, email, id, ...restUser } = takenNotes[i].toUser._doc;
            takenNotes[i].toUser._doc = { name, email, id };

            if (takenNotes[i].fromUser === null) {
                takenNotes[i].fromUser = {
                    name: '탈퇴한 회원',
                    email: '탈퇴한 회원입니다.'
                };
            } else {
                const { name, email, id, ...restUser } =
                    takenNotes[i].fromUser._doc;
                takenNotes[i].fromUser._doc = { name, email, id };
            }
        }

        return takenNotes;
    }

    static async getSentNotes({ user_id }) {
        const user = await User.findById(user_id);
        const sentNotes = await SentNote.findAll(user._id);
        console.log(sentNotes.length);

        for (let i = 0; i < sentNotes.length; i++) {
            const { name, email, id, ...restUser } = sentNotes[i].fromUser._doc;
            sentNotes[i].fromUser._doc = { name, email, id };

            if (sentNotes[i].toUser === null) {
                sentNotes[i].toUser = {
                    name: '탈퇴한 회원',
                    email: '탈퇴한 회원입니다.'
                };
            } else {
                const { name, email, id, ...restUser } =
                    sentNotes[i].toUser._doc;
                sentNotes[i].toUser._doc = { name, email, id };
            }
        }

        return sentNotes;
    }

    static async getTakenNoteInfo({ noteId, user_id }) {
        const note = await TakenNote.findById({ noteId });

        if (!note) {
            const errorMessage =
                '해당 쪽지는 이미 삭제되었거나 전송된 적 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }
        console.log(note);
        if (note.toUser.id !== user_id) {
            const errorMessage = '접근 권한이 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        const { name, email, id, ...restUser } = note.toUser._doc;
        note.toUser._doc = { name, email, id };

        if (note.fromUser === null) {
            note.fromUser = {
                name: '탈퇴한 회원',
                email: '탈퇴한 회원입니다.'
            };
        } else {
            const { name, email, id, ...restUser } = note.fromUser._doc;
            note.fromUser._doc = { name, email, id };
        }

        return note;
    }

    static async getSentNoteInfo({ noteId, user_id }) {
        const note = await SentNote.findById({ noteId });

        if (!note) {
            const errorMessage =
                '해당 쪽지는 이미 삭제되었거나 전송된 적 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }
        console.log(note);
        if (note.fromUser.id !== user_id) {
            const errorMessage = '접근 권한이 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        const { name, email, id, ...restUser } = note.fromUser._doc;
        note.fromUser._doc = { name, email, id };

        if (note.toUser === null) {
            note.toUser = {
                name: '탈퇴한 회원',
                email: '탈퇴한 회원입니다.'
            };
        } else {
            const { name, email, id, ...restUser } = note.toUser._doc;
            note.toUser._doc = { name, email, id };
        }

        return note;
    }

    static async checkNote({ noteId }) {
        await TakenNote.updateCheck({ noteId });
        return;
    }

    static async deleteTakenNote({ noteId, user_id }) {
        const note = await TakenNote.findById({ noteId });

        if (!note) {
            const errorMessage =
                '해당 쪽지는 이미 삭제되었거나 전송된 적 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        if (note.toUser.id !== user_id) {
            const errorMessage = '삭제할 수 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        await TakenNote.deleteById({ noteId });
        return;
    }

    static async deleteSentNote({ noteId, user_id }) {
        const note = await SentNote.findById({ noteId });

        if (!note) {
            const errorMessage =
                '해당 쪽지는 이미 삭제되었거나 전송된 적 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        if (note.fromUser.id !== user_id) {
            const errorMessage = '삭제할 수 없는 쪽지입니다.';
            throw new Error(errorMessage);
        }

        await SentNote.deleteById({ noteId });
        return;
    }
}

export { NoteService };
