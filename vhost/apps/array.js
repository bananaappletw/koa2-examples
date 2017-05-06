// rather than koa apps we can also use array
// bundles of middleware to the same effect.

async function responseTime(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.response.set('X-Response-Time', ms + 'ms');
}

async function index(ctx, next) {
  await next();
  if('/' != ctx.request.url) return;
  ctx.response.body = 'Howzit? From bar middleware bundle';
}

module.exports = [
  responseTime,
  index
];