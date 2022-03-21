import { SentNoteModel } from '../schemas/sentNote';

class SentNote {
    static async create({ newNote }) {
        const createdNewNote = await SentNoteModel.create(newNote);
        return createdNewNote;
    }

    static async findAll() {
        const notes = await SentNoteModel.find({})
            .populate('toUser')
            .populate('fromUser');
        return notes;
    }

    static async findById({ noteId }) {
        const note = await SentNoteModel.findOne({ id: noteId })
            .populate('toUser')
            .populate('fromUser');
        return note;
    }

    static async deleteById({ noteId }) {
        await SentNoteModel.deleteOne({ id: noteId });
        return;
    }
}

export { SentNote };
