/**
 * This example simply sets the number of views from the same client
 * both as a cookie and as a response string.
 */

import Koa from 'koa';
const app = new Koa();

app.use(async (ctx) => {
  var n = ~~ctx.cookies.get('view') + 1;
  ctx.cookies.set('view', n);
  ctx.body = n + ' views';
});

if (!module.parent) app.listen(3000);
export default app;
