const Koa = require('koa');

// koa app

const app = module.exports = new Koa();

app.use(async (ctx, next) => {
  await next();
  ctx.response.set('X-Custom', 'Dub Dub Dub App');	
});

app.use(async (ctx, next) => {
  await next();
  if('/' != ctx.request.url) return;
  ctx.response.body = 'Hello from www app';
});