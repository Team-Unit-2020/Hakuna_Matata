const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { User } = require('../models/model');
const bcrypt = require('bcrypt');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                //const user = await User.findOne({ email });
                User.findOne({ email: email }, (err, user) => {
                    if (!user) {
                        return done(null, false, { message: 'User not found' });
                    }
                    isValidPassword(password, user.password).then(validate => {
                        if (!validate) {
                            return done(null, false, { message: 'Wrong Password' });
                        }
                        return done(null, user, { message: 'Logged in Successfully' });
                    });
                })
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(new JWTstrategy({
    secretOrKey: process.env.AUTH_SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}))

const isValidPassword = async (password, hashedPassword) => {
    const compare = await bcrypt.compare(password, hashedPassword);
    return compare;
}