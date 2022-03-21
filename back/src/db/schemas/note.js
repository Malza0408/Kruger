import { Schema, model } from 'mongoose';

const NoteSchema = new Schema(
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
