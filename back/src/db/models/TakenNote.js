import { TakenNoteModel } from '../schemas/takenNote';

class TakenNote {
    // 받은 쪽지를 생성함
    static async create({ newNote }) {
        const createdNewNote = await TakenNoteModel.create(newNote);
        return createdNewNote;
    }

    // 받은 사람이 현재 사용자인 받은 쪽지들을 가져옴
    static async findAll(toUser) {
        const notes = await TakenNoteModel.find({ toUser })
            .populate('toUser')
            .populate('fromUser');
        return notes;
    }

    // id를 통해 해당 받은 쪽지를 가져옴
    static async findById({ noteId }) {
        const note = await TakenNoteModel.findOne({ id: noteId })
            .populate('toUser')
            .populate('fromUser');
        return note;
    }

    // id를 통해 해당 받은 쪽지의 열람 여부를 변경해줌
    static async updateCheck({ noteId }) {
        await TakenNoteModel.findOneAndUpdate(
            { id: noteId },
            { check: true },
            { returnOriginal: false }
        );
        return;
    }

    // id를 통해 해당 받은 쪽지를 삭제함
    static async deleteById({ noteId }) {
        await TakenNoteModel.deleteOne({ id: noteId });
        return;
    }
}

export { TakenNote };
