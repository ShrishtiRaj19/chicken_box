var products = require('../controllers/products');

module.exports = (router) => {
    router.post('/products/create', products.createProduct);
    router.get('/products/get', products.getProduct);
    router.put('/products/update/:id', products.updateProduct);
    router.delete('/products/delete/:id', products.deleteProduct);
}