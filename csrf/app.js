const session = require('koa-generic-session');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const Csrf = require('koa-csrf');
const Router = require('koa-router');

const app = module.exports = new Koa();
const csrf = new Csrf();
const router = new Router();

/**
 * csrf need session
 */

app.keys = ['session key', 'csrf example'];

app
  .use(convert(session()))
  .use(bodyParser())
  .use(csrf)
  .use(router.routes())
  .use(router.allowedMethods());

/**
 * maybe a bodyparser
 */

app.use(async (ctx, next) => {
  if (ctx.is('application/json')) {
    ctx.body = ctx.request.body;
  }
  await next();
});

/**
 * csrf middleware
 */

/**
 * route
 */

router.get('/token', token);
router.post('/post', post);

async function token (ctx) {
  ctx.body = ctx.csrf;
}

async function post (ctx) {
  ctx.body = {ok: true};
}

if (!module.parent) app.listen(3000);
