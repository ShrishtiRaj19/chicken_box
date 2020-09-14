var payment = require('../controllers/payment');
const validate = require('../controllers/users')

module.exports = (router) => {
    router.post('/order', validate.authenticateToken, payment.order);
    router.post('/capture/payement', validate.authenticateToken, payment.payementDetails);

  
}