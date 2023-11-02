import { Router } from 'express';
import ProductModel from '../../models/product.model.js'

const router = Router();

router.get('/product', async (req, res) => {
    const products = await ProductModel.find();
    res.status(200).json(products);
})

router.get('/product/:pid', async (req, res) => {
    const { pid } = req.params;
    const products = await ProductModel.findById(pid);
    if (!products) {
        return res.status(404).json({ message: `⛔ Product with the id "${pid}" not found` });
    }
    res.status(200).json(products);
})

router.post('/product', async (req, res) => {
    try {
        const { body } = req;
        const products = await ProductModel.create(body);
        res.status(201).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.put('/product/:pid', async (req, res) => {
    const { pid } = req.params;
    const { body } = req;
    const result = await ProductModel.updateOne({ _id: pid }, { $set: body })
    res.status(204).end();
})

router.delete('/product/:pid', async (req, res) => {
    const { pid } = req.params;
    await ProductModel.deleteOne({ _id: pid })
    res.status(204).end();
})

export default router;