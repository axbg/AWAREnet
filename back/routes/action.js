const Router = require('koa-router');
const controller = require('../controllers').action;

const router = new Router();

router.post('/create', controller.createAction);
router.get('/search', controller.searchAction);
router.post('/deactivate', controller.deactivateAction);

module.exports = router;
