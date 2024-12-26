import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { connectDB } from './connectDB';
import sql from 'mssql2';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query`SELECT * FROM Users WHERE id = ${id}`;
        done(null, result.recordset[0]);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query`SELECT * FROM Users WHERE googleId = ${profile.id}`;
        if (result.recordset.length > 0) {
            done(null, result.recordset[0]);
        } else {
            const newUser = await pool.request().query`
                INSERT INTO Users (googleId, username, email) 
                VALUES (${profile.id}, ${profile.displayName}, ${profile.emails[0].value})
                SELECT SCOPE_IDENTITY() AS id
            `;
            done(null, newUser.recordset[0]);
        }
    } catch (err) {
        done(err, null);
    }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query`SELECT * FROM Users WHERE githubId = ${profile.id}`;
        if (result.recordset.length > 0) {
            done(null, result.recordset[0]);
        } else {
            const newUser = await pool.request().query`
                INSERT INTO Users (githubId, username, email) 
                VALUES (${profile.id}, ${profile.username}, ${profile.emails[0].value})
                SELECT SCOPE_IDENTITY() AS id
            `;
            done(null, newUser.recordset[0]);
        }
    } catch (err) {
        done(err, null);
    }
}));