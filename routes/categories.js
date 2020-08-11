var categories = require('../controllers/categories');
const validate = require('../controllers/users')

module.exports = (router) => {
    router.post('/categories/create',validate.authenticateToken, categories.createCategory);
    router.get('/categories/get', categories.getCategory);
    router.post('/categories/search', categories.searchCategory);
    router.get('/categories/:id', categories.getCategoryById);
    router.put('/categories/update/:id',validate.authenticateToken, categories.updateCategory);
    router.delete('/categories/delete/:id',validate.authenticateToken, categories.deleteCategory);
}