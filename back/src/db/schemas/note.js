import { Schema, model } from 'mongoose';

const NoteSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        fromId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        toId: {
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
        },
        check: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const NoteModel = model('Note', NoteSchema);

export { NoteModel };
