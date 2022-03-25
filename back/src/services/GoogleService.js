import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
// import Strategy from 'passport-google-oauth20';
// import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User, Oauth } from '../db';

class GoogleService {
    static async addGoogleUser(userInfo) {
        const user = await User.create(userInfo);
        console.log('google user sign in.');
        return user;
    }
    static async checkUser(userInfo) {
        const id = userInfo.id;
        const loginMethod = userInfo.loginMethod;
        const email = userInfo.email;
        let user = await User.findById(id);

        // 기존 유저가 있으면 토큰발급해서 리턴.
        if (user && user.id === id) {
            const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
            const token = jwt.sign({ user_id: id }, secretKey);
            const { password, ...refinedUser } = user._doc;
            user._doc = { ...refinedUser, token };
            console.log('google user log in.');
            return user;
        } else if (
            user &&
            user.email === email &&
            user.loginMethod === 'email'
        ) {
            const errorMessage =
                '이 이메일은 현재 사용중입니다. 다른 방식으로 가입해주세요.';
            throw new Error(errorMessage);
        }

        // 이메일이 등록안됐으면 처음 구글로 회원가입하는 유저.
        user = await this.addGoogleUser(userInfo);
    }
}
// const config = {
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/auth/google/callback'
// };

// 구글 strategy
// passport.use(
//     new Strategy(config, async (accessToken, refreshToken, profile, done) => {
//         //profile에 구글에서 넘겨주는 유저정보 중 email, name을 사용 raw json으로 넣어줌.
//         // console.log('어세스토큰', accessToken);
//         // console.log('리프레쉬', refreshToken);

//         const { sub, email, name } = profile._json;
//         try {
//             const user = await findOrCreateUser({ sub, email, name });
//             // 로그인 성공 -> JWT 웹 토큰 생성
//             const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
//             const token = jwt.sign({ user_id: user.id }, secretKey);
//             //done에 넘겨준 데이터가 라우터의 req로 들어간다.
//             done(null, {
//                 token: token,
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 loginMethod: user.loginMethod
//             });
//         } catch (error) {
//             done(error, null);
//         }
//     })
// );
// passport.serializeUser((user, done) => {
//     done(null, user);
// });
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

export { GoogleService };
