const Router = require('koa-router');
const {ENABLE_SWAGGER} = require('../properties');
const koaSwagger = require('koa2-swagger-ui');
const spec = require('../configurations/docs');

const {authenticated}= require('../middlewares').authentication;

const userRouter = require('./user');
const eventRouter = require('./event');
const actionRouter = require('./action');

const router = new Router({prefix: '/api'});

router.get('/', (ctx) => {
  ctx.status = 200;
  ctx.body = {message: 'koa starter - hello endpoint'};
});

// public routes - register your public routers here
router.use('/user', userRouter.routes());

router.use(authenticated);

router.use('/event', eventRouter.routes());
router.use('/action', actionRouter.routes());

// protected routes - you can register your protected routers here
router.get('/authenticated', (ctx) => {
  ctx.status = 200;
  ctx.body = {message: 'koa-starter - authenticated endpoint'};
});

module.exports = router;
