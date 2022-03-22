import { Schema, model } from 'mongoose';

const NoticeSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        captain: {
            type: Schema.Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        },
        like: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
        nowEnrolling: {
            type: Boolean,
            default: true
        },
        member: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
        applicant: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
        Comment: {
            type: [
                {
                    author: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
                    },
                    content: {
                        type: String,
                        required: true
                    }
                }
            ],
            required: false
        }
    },
    {
        timestamps: true
    }
);

const NoticeModel = model('Notice', NoticeSchema);

export { NoticeModel };
