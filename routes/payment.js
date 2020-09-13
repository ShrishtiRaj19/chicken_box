var payment = require('../controllers/payment');

module.exports = (router) => {
    router.get('/order', payment.order);
  
}