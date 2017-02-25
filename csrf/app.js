import session from 'koa-generic-session';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import Csrf from 'koa-csrf';
import Router from 'koa-router';

const app = new Koa();
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
    this.body = ctx.request.body;
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
export default app;
