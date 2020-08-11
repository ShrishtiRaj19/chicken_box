var user = require('../controllers/users');

module.exports = (router) => {
    router.post('/signup', user.signup);
    router.post('/login', user.login);
}