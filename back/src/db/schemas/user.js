import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false,
            default: '설명이 아직 없습니다. 추가해 주세요.'
        },
        picture: {
            type: String,
            required: false,
            default: 'http://placekitten.com/200/200'
        },
        follow: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
        follower: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
        loginMethod: {
            type: String,
            required: false,
            default: 'email'
        },
        repositoryUrl: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const UserModel = model('User', UserSchema);

export { UserModel };
