const Router = require('koa-router');
const controller = require('../controllers').user;

const {authenticated} = require('../middlewares').authentication;

const router = new Router();

router.post('/login/local', controller.login);

// protecting individual routes
router.get('/logout', authenticated, controller.logout);

module.exports = router;
