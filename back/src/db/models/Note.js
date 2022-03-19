import { NoteModel } from '../schemas/note';

class Note {
    static async create({ newNote }) {
        const createdNewNote = await NoteModel.create(newNote);
        return createdNewNote;
    }

    static async findAllTo({ user_id }) {
        const notes = await NoteModel.find({}).populate('toUser');
        const takenNotes = notes.filter((v) => v.toUser.id == user_id);
        return takenNotes;
    }

    static async findAllFrom({ user_id }) {
        const notes = await NoteModel.find({}).populate('fromUser');
        const sentNotes = notes.filter((v) => v.fromUser.id == user_id);
        return sentNotes;
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
