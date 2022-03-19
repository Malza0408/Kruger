import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

import Strategy from 'passport-google-oauth20';
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
import passport from 'passport';
// import Passport from './config/passport';
import { User, Oauth } from '../db';
// 어디서 가져오는거지?

const config = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
};

async function findOrCreateUser({ name, email }) {
    const user = await User.findByEmail({
        email
    });

    if (user) {
        return user;
    }
    const id = uuidv4();

    const newUser = { id, name, email, password: 'GOOGLE_OAUTH' };
    const created = await User.create(newUser);

    return created;
}

// 구글 strategy
passport.use(
    new Strategy(config, async (accessToken, refreshToken, profile, done) => {
        //profile에 구글에서 넘겨주는 유저정보 중 email, name을 사용 raw json으로 넣어줌.
        console.log('프로필', profile);
        console.log('어세스토큰', accessToken);
        const { email, name } = profile._json;
        try {
            const user = await findOrCreateUser({ email, name });
            done(null, {
                id: user.id,
                email: user.email,
                name: user.name
            });
        } catch (error) {
            done(e, null);
        }
    })
);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;
