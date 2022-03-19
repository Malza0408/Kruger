import { NoteModel } from '../schemas/note';

class Note {
    static async create({ newNote }) {
        const createdNewNote = await NoteModel.create(newNote);
        return createdNewNote;
    }

    static async findAllTo({ toId }) {
        const takenNotes = await NoteModel.find({ toId });
        return takenNotes;
    }

    static async findAllFrom({ fromId }) {
        const sentNotes = await NoteModel.find({ fromId });
        return sentNotes;
    }

    static async findById({ noteId }) {
        const note = await NoteModel.findOne({ id: noteId });
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
        await NoteModel.deleteOne({ noteId });
        return;
    }
}

export { Note };
