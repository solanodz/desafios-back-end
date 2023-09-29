
const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');
const PM = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const products = PM.getProducts(limit);
    res.json({ products });
});

app.get('/products/:pid', (req, res) => {
    const prodId = parseInt(req.params.pid);
    try {
        const product = PM.getProductById(prodId);
        res.json(product);
    } catch (error) {
        res.status(404).send('Producto no encontrado.');
    }
});

app.listen(8080, () => {
    console.log('Servidor escuchando desde el puerto 8080');
});

