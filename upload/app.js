
/**
 * Module dependencies.
 */

const logger = require('koa-logger');
const serve = require('koa-static');
const parse = require('async-busboy');
const Koa = require('koa');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = new Koa();

// log requests

app.use(logger());

// custom 404

app.use(async (ctx, next) => {
  await next();
  if (ctx.response.body || !ctx.request.idempotent) return;
  ctx.response.redirect('/404.html');
});

// serve files from ./public

app.use(serve(path.join(__dirname, '/public')));

// handle uploads

app.use(async (ctx, next) => {
  // ignore non-POSTs
  if ('POST' != ctx.request.method) return await next();

  // multipart upload
  const parts = await parse(ctx.req);

  for(let part of parts.files) {
    const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
    part.pipe(stream);
    console.log('uploading %s -> %s', part.filename, stream.path);
  }

  ctx.response.redirect('/');
});

// listen

app.listen(3000, () => {
  console.log('listening on port 3000');
});
