import { Schema, model } from 'mongoose';

const TeamSchema = new Schema(
    {
        id: {
            type: String,
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
        nowErolling: {
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

const TeamModel = model('Team', TeamSchema);

export { TeamModel };
