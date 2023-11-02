import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import { __dirname } from './utils.js';
import productRouter from './routers/api/products.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('views', 'handlebars');

// ROUTERS 

app.use('/api', productRouter);

app.use((error, req, res, next) => {
    const message = `⛔ Ha ocurrdo un error: ${error.message}`;
    console.log(message);
    res.status(500).json({ message });
});

export default app;