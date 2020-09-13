var user = require('../controllers/users');

module.exports = (router) => {
    router.post('/signup', user.signup);
    router.put('/user/update', user.updateUser);
    router.post('/login', user.login);
    router.get('/users', user.getUsers);
}