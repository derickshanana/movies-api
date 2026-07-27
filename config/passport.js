const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const db = getDb();
                const users = db.db().collection('users');

                // If this GitHub user has logged in before, reuse their record.
                // Otherwise create a new account automatically - this is the
                // "create an account" step for OAuth: no password is ever
                // collected or stored, GitHub already verified identity.
                let user = await users.findOne({ githubId: profile.id });

                if (!user) {
                    const newUser = {
                        githubId: profile.id,
                        username: profile.username,
                        displayName: profile.displayName || profile.username
                    };
                    const result = await users.insertOne(newUser);
                    user = { _id: result.insertedId, ...newUser };
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// Store just the user's Mongo _id in the session
passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

// Look the user back up on each request using the id in the session
passport.deserializeUser(async (id, done) => {
    try {
        const db = getDb();
        const user = await db.db().collection('users').findOne({ _id: new ObjectId(id) });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;