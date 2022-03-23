import { Schema, model } from 'mongoose';

const RecruitmentSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        captain: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
        language: {
            type: [String],
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
        comment: {
            type: [
                {
                    id: {
                        type: String,
                        required: true
                    },
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
            default: []
        }
    },
    {
        timestamps: true
    }
);

const RecruitmentModel = model('Recruitment', RecruitmentSchema);

export { RecruitmentModel };
