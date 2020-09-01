var banner = require('../controllers/banner');

module.exports = (router) => {
    router.post('/banner/create', banner.createBanner);
    router.post('/banner/update/:id', banner.updateBanner);
    router.get('/banner/get/:id', banner.getBannerById);
    router.get('/banner/get', banner.getBannerList);
    router.delete('/banner/delete/:id', banner.deleteBanner);
}