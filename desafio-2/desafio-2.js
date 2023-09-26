class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }
    generateId() {
        this.id++;
        return this.id;
    }
    addProduct(product) {
        const { title, description, thumbnail, code, price, stock } = product;
        if (!title || !description || !thumbnail || !code || !price || !stock) {
            throw new Error('Todos los campos deben ser completados.');
        }
        const newProduct = { id: this.generateId(), ...product };  // Utilizar el contador de IDs
        this.products.push(newProduct);
        return newProduct;
    }
    getProducts() {
        return this.products;
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
    title: 'producto 1',
    description: 'descripcion 1',
    thumbnail: 'imagen.jpg',
    code: 'aaa111',
    price: 10,
    stock: 100
});
PM.addProduct({
    title: 'producto 2',
    description: 'descripcion 2',
    thumbnail: 'imagen.jpg',
    code: 'bbb222',
    price: 20,
    stock: 200
});
PM.addProduct({
    title: 'producto 3',
    description: 'descripcion 3',
    thumbnail: 'imagen.jpg',
    code: 'ccc111',
    price: 30,
    stock: 300
});
PM.addProduct({
    title: 'producto 4',
    description: 'descripcion 4',
    thumbnail: 'imagen.jpg',
    code: 'ddd444',
    price: 40,
    stock: 400
});

console.log(PM.getProducts());
console.log(PM.getProductById(3));
console.log(PM.updateProduct(1, {
    title: 'prod 1 updated',
    description: 'desc 1 updated',
    thumbnail: 'imagen.jpg updated',
    code: 'ddd444 updated',
    price: 10,
    stock: 100
}));
console.log(PM.getProducts());
console.log(PM.deleteProduct(3));
