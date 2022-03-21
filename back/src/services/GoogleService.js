import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import Strategy from 'passport-google-oauth20';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User, Oauth } from '../db';
// 어디서 가져오는거지?

const config = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
};

async function findOrCreateUser({ sub, name, email }) {
    const user = await User.findByEmail({
        email
    });
    if (user) {
        return user;
    }
    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
    const token = jwt.sign({ user_id: sub }, secretKey);
    console.log(token);
    const newUser = {
        token,
        id: sub,
        name,
        email,
        password: 'GOOGLE_OAUTH',
        loginMethod: 'google'
    };
    const created = await User.create(newUser);
    return created;
}

// 구글 strategy
passport.use(
    new Strategy(config, async (accessToken, refreshToken, profile, done) => {
        //profile에 구글에서 넘겨주는 유저정보 중 email, name을 사용 raw json으로 넣어줌.
        console.log('어세스토큰', accessToken);
        console.log('리프레쉬', refreshToken);

        const { sub, email, name } = profile._json;
        try {
            const user = await findOrCreateUser({ sub, email, name });
            done(null, {
                id: user.id,
                email: user.email,
                name: user.name
            });
        } catch (error) {
            done(error, null);
        }
    })
);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

export { passport };
