const fs = require("fs");
class ProductManager {
    constructor() {
        this.loadProducts();
        this.id =
            this.products.length > 0
                ? Math.max(...this.products.map((product) => product.id))
                : 0;
    }

    loadProducts() {
        try {
            const data = fs.readFileSync("products.json", "utf8");
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync("products.json", data, "utf8");
    }

    generateId() {
        this.id++;
        return this.id;
    }

    addProduct(product) {
        const { title, description, thumbnail, code, price, stock } = product;
        if (!title || !description || !thumbnail || !code || !price || !stock) {
            throw new Error("Todos los campos deben ser completados.");
        }
        const newProduct = { id: this.generateId(), ...product };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }
    getProducts(limit) {
        if (limit) {
            return this.products.slice(0, parseInt(limit));
        } else {
            return this.products;
        }
    }
    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error(`No se encontró el producto con el id ${id}`);
        }
        return product;
    }
    updateProduct(id, updatedProduct) {
        const updatedProducts = this.products.map((product) => {
            if (product.id === id) {
                return { ...product, ...updatedProduct };
            }
            return product;
        });
        this.products = updatedProducts;
        return updatedProducts;
    }
    deleteProduct(id) {
        this.products = this.products.filter((product) => product.id !== id);
        return this.products;
    }
}

const PM = new ProductManager();

PM.addProduct({
    title: "producto 1",
    description: "descripcion 1",
    thumbnail: "imagen.jpg",
    code: "aaa111",
    price: 10,
    stock: 100,
});
PM.addProduct({
    title: "producto 2",
    description: "descripcion 2",
    thumbnail: "imagen.jpg",
    code: "bbb222",
    price: 20,
    stock: 200,
});
PM.addProduct({
    title: "producto 3",
    description: "descripcion 3",
    thumbnail: "imagen.jpg",
    code: "ccc111",
    price: 30,
    stock: 300,
});
PM.addProduct({
    title: "producto 4",
    description: "descripcion 4",
    thumbnail: "imagen.jpg",
    code: "ddd444",
    price: 40,
    stock: 400,
});
PM.addProduct({
    title: "producto 5",
    description: "descripcion 5",
    thumbnail: "imagen.jpg",
    code: "eee555",
    price: 50,
    stock: 500,
});
PM.addProduct({
    title: "producto 6",
    description: "descripcion 6",
    thumbnail: "imagen.jpg",
    code: "fff666",
    price: 60,
    stock: 600,
});
PM.addProduct({
    title: "producto 7",
    description: "descripcion 7",
    thumbnail: "imagen.jpg",
    code: "ggg777",
    price: 75,
    stock: 700,
});
PM.addProduct({
    title: "producto 8",
    description: "descripcion 8",
    thumbnail: "imagen.jpg",
    code: "hhh888",
    price: 86,
    stock: 800,
});
PM.addProduct({
    title: "producto 9",
    description: "descripcion 9",
    thumbnail: "imagen.jpg",
    code: "iii999",
    price: 97,
    stock: 900,
});
PM.addProduct({
    title: "producto 10",
    description: "descripcion 10",
    thumbnail: "imagen.jpg",
    code: "jjj100",
    price: 180,
    stock: 1000,
});

module.exports = ProductManager