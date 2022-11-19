const Router = require('koa-router');
const controller = require('../controllers').event;

const router = new Router();

router.post('/create', controller.login);

module.exports = router;
