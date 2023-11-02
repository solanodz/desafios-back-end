import mongoose from 'mongoose';

const cartsSchema = new mongoose.Schema({
    products: { type: Object, required: true }
}, { timestamps: true })

export default mongoose.model('Carts', cartsSchema);