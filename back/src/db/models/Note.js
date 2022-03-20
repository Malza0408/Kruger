import { NoteModel } from '../schemas/note';

class Note {
    static async create({ newNote }) {
        const createdNewNote = await NoteModel.create(newNote);
        return createdNewNote;
    }

    static async findAll() {
        const notes = await NoteModel.find({})
            .populate('toUser')
            .populate('fromUser');
        return notes;
    }

    static async findById({ noteId }) {
        const note = await NoteModel.findOne({ id: noteId })
            .populate('toUser')
            .populate('fromUser');
        return note;
    }

    static async updateCheck({ noteId }) {
        await NoteModel.findOneAndUpdate(
            { id: noteId },
            { check: true },
            { returnOriginal: false }
        );
        return;
    }

    static async deleteById({ noteId }) {
        await NoteModel.deleteOne({ id: noteId });
        return;
    }
}

export { Note };
