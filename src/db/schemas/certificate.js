import { Schema, model } from 'mongoose';

const CertificateSchema = new Schema(
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
        date: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const CertificateModel = model('Certificate', CertificateSchema);

export { CertificateModel };
