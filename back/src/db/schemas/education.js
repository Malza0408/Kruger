import { Schema, model } from 'mongoose';

const EducationSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        school: {
            type: String,
            required: true
        },
        major: {
            type: String,
            required: true
        },
        graduation: {
            type: String,
            enum: ['재학중', '학사졸업', '석사졸업', '박사졸업'],
            required: false
        }
    },
    {
        timestamps: true
    }
);

const EducationModel = model('Education', EducationSchema);
export { EducationModel };
