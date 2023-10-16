(function () {
    const socket = io();

    socket.emit('new-message', 'Hola desde el frontend');

    socket.on('mensaje_directo', (message) => {
        console.log('[mensaje_directo]', message);
    });

    socket.on('mensaje_a_todos_los_clientes', (message) => {
        console.log('[mensaje_a_todos_los_clientes]', message);
    });

    socket.on('mensaje_a_todos', (message) => {
        console.log('[mensaje_a_todos_los_clientes]', message);
    });

    socket.on('product-added', (product) => {
        const productListItem = document.createElement('li');
        productListItem.textContent = `${product.id} - ${product.name} - ${product.price}`;
        document.getElementById('product-list').appendChild(productListItem);

        const products = Array.from(document.querySelectorAll('#product-list li')).map((li) => {
            const [id, name, price] = li.textContent.split(' - ');
            return { id, name, price: Number(price) };
        });

        socket.emit('updateProducts', products);

        const context = { products };
        const html = Handlebars.templates.home(context);
        document.getElementById('content').innerHTML = html;
    });


})();