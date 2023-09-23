const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const { title, description, thumbnail, code, price, stock } = product;
        if (!title || !description || !thumbnail || !code || !price || !stock) {
            throw new Error('Todos los campos deben ser completados.');
        }

        const products = await this.getProducts();
        const id = this.generateUniqueId(products);
        const newProduct = { id, ...product };
        products.push(newProduct);

        await this.saveJSONToFile(products);
        return newProduct;
    }

    async getProducts() {
        return await this.getJSONFromFile();
    }

    async getProductsById(id) {
        const products = await this.getJSONFromFile();
        const product = products.find((product) => product.id === id);
        if (!product) {
            throw new Error(`No se encontró el producto con el id ${id}`);
        }
        return product;
    }

    async updateProduct(id, updatedProduct) {
        const products = await this.getJSONFromFile();
        const updatedProducts = products.map((product) => {
            if (product.id === id) {
                return { ...product, ...updatedProduct };
            }
            return product;
        });
        await this.saveJSONToFile(updatedProducts);
        return updatedProducts;
    }

    async deleteProduct(id) {
        const products = await this.getJSONFromFile();
        const remainingProducts = products.filter((product) => product.id !== id);
        await this.saveJSONToFile(remainingProducts);
        return remainingProducts;
    }

    async getJSONFromFile() {
        if (!(await this.existsFile())) {
            return [];
        }

        let content;
        try {
            content = await fs.promises.readFile(this.path, 'utf-8');
        } catch (error) {
            throw new Error(`El archivo ${this.path} no pudo ser leído.`);
        }

        try {
            return JSON.parse(content);
        } catch (error) {
            throw new Error(`El archivo ${this.path} no tiene un formato JSON válido`);
        }
    }

    async saveJSONToFile(data) {
        const content = JSON.stringify(data, null, '\t');
        try {
            await fs.promises.writeFile(this.path, content, 'utf-8');
        } catch (error) {
            throw new Error(`El archivo ${this.path} no pudo ser escrito.`);
        }
    }

    async existsFile() {
        try {
            await fs.promises.access(this.path);
            return true;
        } catch (error) {
            return false;
        }
    }

    generateUniqueId(products) {
        let id;
        do {
            id = Date.now();
        } while (products.some((product) => product.id === id));
        return id;
    }
}

async function runTests() {
    const productManager = new ProductManager('./products.json');

    try {
        // Crear instancia de ProductManager
        console.log('Instancia de ProductManager creada.');

        // Llamar a getProducts y verificar que devuelva un arreglo vacío []
        const products = await productManager.getProducts();
        console.log('getProducts devuelve:', products);

        // Llamar a addProduct con campos especificados
        const addedProduct = await productManager.addProduct({
            title: 'producto prueba',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
            stock: 25,
        });
        console.log('Producto agregado:', addedProduct);

        // Verificar que se haya generado un id automaticamente
        console.log('ID del producto:', addedProduct.id);

        // Llamar a getProductById y verificar que devuelva el producto con el id especificado
        const retrievedProduct = await productManager.getProductsById(addedProduct.id);
        console.log('Producto encontrado por ID:', retrievedProduct);

        // Llamar a updateProduct y actualizar un campo de algun producto
        const updatedFields = { title: 'Nuevo título', price: 250 };
        const updatedProducts = await productManager.updateProduct(addedProduct.id, updatedFields);
        console.log('Producto actualizado:', updatedProducts);

        // Llamar a deleteProduct y verificar que el producto se haya eliminado
        const remainingProducts = await productManager.deleteProduct(addedProduct.id);
        console.log('Producto eliminado. Estos son los productos que quedan:', remainingProducts);
    } catch (error) {
        console.error('Error en el proceso de testing:', error.message);
    }
}

runTests();

