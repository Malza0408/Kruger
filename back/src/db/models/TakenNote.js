import { TakenNoteModel } from '../schemas/takenNote';

class TakenNote {
    static async create({ newNote }) {
        const createdNewNote = await TakenNoteModel.create(newNote);
        return createdNewNote;
    }

    static async findAll(toUser) {
        const notes = await TakenNoteModel.find({ toUser })
            .populate('toUser')
            .populate('fromUser');
        return notes;
    }

    static async findById({ noteId }) {
        const note = await TakenNoteModel.findOne({ id: noteId })
            .populate('toUser')
            .populate('fromUser');
        return note;
    }

    static async updateCheck({ noteId }) {
        await TakenNoteModel.findOneAndUpdate(
            { id: noteId },
            { check: true },
            { returnOriginal: false }
        );
        return;
    }

    static async deleteById({ noteId }) {
        await TakenNoteModel.deleteOne({ id: noteId });
        return;
    }
}

export { TakenNote };
