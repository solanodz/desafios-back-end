import { Router } from 'express'
import passport from 'passport'
import { createHash, isValidPassword } from '../utils.js'

import UserModel from '../models/user.model.js'

const router = Router()

/* router.post('/register', async (req, res) => {
    const { body } = req;
    body.role = 'usuario'; // los registros que sea crean son 'usuarios' por defecto, no 'admin'
    const newUser = await UserModel.create({
        ...body,
        password: createHash(body.password)
    });
    console.log('New User', newUser);
    console.log('Registro exitoso. Redirigiendo a /sessions/login');
    res.redirect('/sessions/login');
}) */

router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => {
    res.redirect('/sessions/login');
})

// con esto ['user:email'] estamos diciendo que se concentre en el mail del usuario para hacer la autenticacion
// Ruta que nos dirige a gihtub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))


// Ruta que nos dirije de vuelta
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    console.log('req.user', req.user);
    req.session.user = req.user
    res.redirect('/products');
})

// sessions.router.js
router.post('/login', async (req, res) => {
    const { body: { email, password } } = req;

    // Verificar si es el administrador
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        // Si es el administrador, asignar el rol correspondiente
        req.session.user = { email, role: 'admin' };
        console.log('Inicio de sesión exitoso. Redirigiendo a /profile');
        return res.redirect('/profile');
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).send('Correo o contraseña inválidos ⛔');
    }

    const isPassValid = isValidPassword(password, user);
    if (!isPassValid) {
        return res.status(401).send('Correo o contraseña inválidos ⛔')
    }

    const { first_name, last_name, role } = user;
    req.session.user = { first_name, last_name, email, role };
    res.redirect('/products');
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/sessions/login')
    });
})

export default router;