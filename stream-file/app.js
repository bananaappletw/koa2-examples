var Koa = require('koa');
var fs = require('fs');
var app = module.exports = new Koa();
var path = require('path');
var extname = path.extname;

// try GET /app.js

app.use(async (ctx) => {
  var fpath = path.join(__dirname, ctx.path);
  var fstat = await stat(fpath);
  console.log(fstat);

  if (fstat.isFile()) {
    ctx.type = extname(fpath);
    ctx.body = fs.createReadStream(fpath);
  }
});

if (!module.parent) app.listen(3000);

/**
 * thunkify stat
 */

function stat (file) {
  return new Promise(function (resolve, reject) {
    fs.stat(file, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
