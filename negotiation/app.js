
const Koa = require('koa');
const app = module.exports = new Koa();

const tobi = {
  _id: '123',
  name: 'tobi',
  species: 'ferret'
};

const loki = {
  _id: '321',
  name: 'loki',
  species: 'ferret'
};

const users = {
  tobi: tobi,
  loki: loki
};

// content negotiation middleware.
// note that you should always check for
// presence of a body, and sometimes you
// may want to check the type, as it may
// be a stream, buffer, string, etc.

app.use(async (ctx, next) => {
  await next();

  // no body? nothing to format, early return
  if (!ctx.response.body) return;

  // Check which type is best match by giving
  // a list of acceptable types to `req.accepts()`.
  const type = ctx.accepts('json', 'html', 'xml', 'text');

  // not acceptable
  if (type === false) ctx.throw(406);

  // accepts json, koa handles this for us,
  // so just return
  if (type === 'json') return;

  // accepts xml
  if (type === 'xml') {
    ctx.response.type = 'xml';
    ctx.response.body = '<name>' + ctx.response.body.name + '</name>';
    return;
  }

  // accepts html
  if (type === 'html') {
    ctx.response.type = 'html';
    ctx.response.body = '<h1>' + ctx.response.body.name + '</h1>';
    return;
  }

  // default to text
  ctx.response.type = 'text';
  ctx.response.body = ctx.response.body.name;
});

// filter responses, in this case remove ._id
// since it's private

app.use(async (ctx, next) => {
  await next();

  if (!ctx.response.body) return;

  delete ctx.response.body._id;
});

// try $ GET /tobi
// try $ GET /loki

app.use(async ctx => {
  const name = ctx.request.path.slice(1);
  const user = users[name];
  ctx.response.body = user;
});

if (!module.parent) app.listen(3000);

