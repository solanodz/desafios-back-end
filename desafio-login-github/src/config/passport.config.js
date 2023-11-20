import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import GithubStrategy from 'passport-github2'
import { createHash, isValidPassword } from '../utils.js'
import UserModel from '../models/user.model.js'

const opts = {
    usernameField: 'email',
    passReqToCallback: true,
}

const GithubOpts = {
    clientID: 'Iv1.6cdf7e4e3b44a838',
    clientSecret: '03f5c656e7fee66c780de8c4bec942d293c0c02d',
    callbackURL: 'http://localhost:8080/sessions/github/callback'
}

export const init = () => {
    passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await UserModel.findOne({ email });
            if (user) {
                return done(new Error('User already registered'), user);
            }
            const newUser = await UserModel.create({
                ...req.body,
                password: createHash(password)
            });
            done(null, newUser);
        } catch (error) {
            done(new Error(`Error during the authentication process: ${error.message}.`))
        }
    }));

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
            const user = await UserModel.findOne({ email })
            if (!user) {
                return done(new Error('Correo o contraseña invalidos.'))
            }
            const isPassValid = isValidPassword(password, user);
            if (!isPassValid) {
                return done(new Error('Correo o contraseña invalidos.'));
            }
            console.log('Here');
            done(null, user)
        } catch (error) {
            done(new Error(`⛔ Ocurrio un error durante la autenticación ${error.message}.`))
        }
    }))

    passport.use('github', new GithubStrategy(GithubOpts, async (accessToken, refreshToken, profile, done) => {
        console.log('Profile', profile);
        const email = profile._json.email
        let user = await UserModel.findOne({ email })
        if (user) {
            return done(null, user); // si el usuario existe, ingrsa
        }
        user = { // si el usuario no existe, lo registramos de una
            first_name: profile._json.name, // en profile._json se llama name
            last_name: '', // en profile._json.name esta el nombre completo asi que esto va vacio
            email,
            age: 18, // 18 por defecto
            password: '',
            provider: 'gitHub', // agregamos este campo que indica que este ususario que estamos creando viene del proveedor de GitHub
        };

        const newUser = await UserModel.create(user)
        done(null, newUser);
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (uid, done) => {
        const user = await UserModel.findById(uid);
        done(null, user)
    })

}