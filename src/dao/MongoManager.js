// Aca crearemos el CRUD con mongoose que reemplazara el FileSystem
import productModel from "../models/product.model";

export default class MongoManager {
    static get(query = {}) {
        const criteria = {};
        if (query.products) {
            criteria.products = query.products;
        }
        return productModel.find(criteria);
    }

    static async getById(pid) {
        const cart = await productModel.findById(pid);
        if (!cart) {
            throw new Error(`⛔ No se encontro el carrito con id ${pid}`);
        }
        return cart;
    }

    static async create(data) {
        const cart = await productModel.create(data);
        console.log('Carrito creado correctamente ✅');
        return cart;
    }

    static async updateById(pid, data) {
        const cart = await productModel.findById(pid);
        if (!cart) {
            throw new Error(`⛔ No se encontro el carrito con id ${pid}`);
        }
        const criteria = { _id: pid };
        const operation = { $set: data };
        const result = await productModel.updateOne(criteria, operation); // Agregado 'await' aquí
        console.log('Carrito actualizado correctamente ✅');
    }

    static async deleteById(pid) {
        const cart = await productModel.findById(pid);
        if (!cart) {
            throw new Error(`⛔ No se encontro el carrito con id ${pid}`);
        }
        await productModel.deleteOne({ _id: pid });
        console.log('Carrito eliminado correctamente ✅');
    }
}
