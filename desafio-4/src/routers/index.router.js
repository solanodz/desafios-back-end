import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const user = {
        id: 'e9edb299-ceab-43d2-bc04-9be1d69e901d',
        firstName: 'Rick',
        lastName: 'Sanchez',
        age: 70,
        email: 'rs@email.com',
    };
    res.render('index', user);
});

router.get('/realtimeproducts', (req, res, next) => {
    res.render('realTimeProducts', { title: 'Lista de productos en tiempo real' });
});

export default router;