const Koa = require('koa');
const JSONStream = require('streaming-json-stringify');

const app = module.exports = new Koa();

app.use(async ctx => {
  ctx.response.type = 'json';
  const stream = ctx.response.body = JSONStream();

  stream.on('error', ctx.onerror);

  setImmediate(() => { 
    stream.write({
      id: 1
    });

    setImmediate(() => {
      stream.write({
        id: 2
      });

      setImmediate(() => {
        stream.end();
      });
    });
  });

});

if (!module.parent) app.listen(3000);