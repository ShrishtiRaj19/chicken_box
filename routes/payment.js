var payment = require('../controllers/payment');

module.exports = (router) => {
    router.post('/order', payment.order);
    router.post('/capture/payement', payment.payementDetails);

  
}