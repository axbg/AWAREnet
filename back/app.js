require('dotenv').config();

const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const session = require('koa-session');
const morgan = require('koa-morgan');

const logger = require('./configurations/logger');
const passport = require('./configurations/security');
const middleware = require('./middlewares');
const router = require('./routes');

const {connectDatabase} = require('./models');

const {
  PROD,
  ALLOW_CORS,
  COOKIE_KEYS,
  SESSION_CONFIG,
  PORT,
} = require('./properties');

const app = new Koa();

!PROD && console.log(require('./properties'));

const corsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Methods",
    "Access-Control-Request-Headers",
  ],
  credentials: true,
  secure: true
};
app.use(cors(corsOptions));

app.use(morgan('combined', {stream: logger.stream}));

app.keys = COOKIE_KEYS;
app.use(passport.initialize());
app.use(session(SESSION_CONFIG, app));

app.use(json());
app.use(bodyParser());

app.use(middleware.error.globalErrorHandler);

connectDatabase();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log('koa starter - running on http://localhost:' + PORT);
});
