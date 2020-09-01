var cart = require('../controllers/cart');

module.exports = (router) => {
    router.post('/cart/create', cart.createCart);
    router.get('/cart/get/:userId', cart.getCart);
    router.delete('/cart/delete', cart.deleteCart);
}