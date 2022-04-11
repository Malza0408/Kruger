import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        user_id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        from_date: {
            type: String,
            required: true
        },
        to_date: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const ProjectModel = model('Project', ProjectSchema);

export { ProjectModel };
