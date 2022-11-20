const Router = require('koa-router');
const controller = require('../controllers').request;

const router = new Router();

router.post('/create', controller.createRequest);
router.get('/search', controller.searchRequest);
router.post('/respond', controller.respondToRequest)
router.post('/deactivate', controller.deactivateRequest);

module.exports = router;
