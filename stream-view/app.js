const Koa = require('koa');
const app = module.exports = new Koa();

const View = require('./view');

app.use(async function (ctx) {
  ctx.type = 'html';
  ctx.body = new View(this);
});

if (!module.parent) app.listen(3000);
