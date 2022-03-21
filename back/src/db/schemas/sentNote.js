import { Schema, model } from 'mongoose';

const SentNoteSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        fromUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        toUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const SentNoteModel = model('SentNote', SentNoteSchema);

export { SentNoteModel };
