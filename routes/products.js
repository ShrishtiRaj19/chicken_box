var products = require('../controllers/products');
const validate = require('../controllers/users')

module.exports = (router) => {
    router.post('/products/create',validate.authenticateToken,  products.createProduct);
    router.get('/products/get/:catid', products.getProduct);
    router.get('/products/get', products.getProduct);
    router.put('/products/update/:id',validate.authenticateToken, products.updateProduct);
    router.delete('/products/delete/:id',validate.authenticateToken, products.deleteProduct);
}