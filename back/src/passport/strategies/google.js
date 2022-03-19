import 'dotenv/config';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, Oauth } = require();

const config = {
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: '/auth/google/callback'
};

new GoogleStrategy(config, async (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json;
});
