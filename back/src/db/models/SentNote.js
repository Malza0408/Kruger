import { SentNoteModel } from '../schemas/sentNote';

class SentNote {
    // 보낸 쪽지를 생성함
    static async create({ newNote }) {
        const createdNewNote = await SentNoteModel.create(newNote);
        return createdNewNote;
    }

    // 보낸 사람이 현재 사용자인 보낸 쪽지들을 가져옴
    static async findAll(fromUser) {
        const notes = await SentNoteModel.find({ fromUser })
            .populate('toUser')
            .populate('fromUser');
        return notes;
    }

    // id를 통해 해당 보낸 쪽지를 가져옴
    static async findById({ noteId }) {
        const note = await SentNoteModel.findOne({ id: noteId })
            .populate('toUser')
            .populate('fromUser');
        return note;
    }

    // id를 통해 해당 보낸 쪽지를 삭제함
    static async deleteById({ noteId }) {
        await SentNoteModel.deleteOne({ id: noteId });
        return;
    }
}

export { SentNote };
