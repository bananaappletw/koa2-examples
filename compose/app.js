/**
 * Each `app.use()` only accepts a single async function.
 * If you want to combine multiple async functions into a single one,
 * you can use `koa-compose@next` to do so.
 * This allows you to use `app.use()` only once.
 * Your code will end up looking something like:
 *
 *   app.use(compose([
 *     async function (){},
 *     async function (){},
 *     async function (){}
 *   ]))
*/

import compose from 'koa-compose';
import Koa from 'koa';
const app = new Koa();

// x-response-time

async function responseTime (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
}

// logger

async function logger (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  }
}

// response

async function respond (ctx, next) {
  await next();
  if (ctx.url !== '/') return;
  ctx.body = 'Hello World';
}

// composed middleware

var all = compose([
  responseTime,
  logger,
  respond
]);

app.use(all);

if (!module.parent) app.listen(3000);
export default app;
