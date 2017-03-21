import Koa from 'koa';
const app = new Koa();
import fs from 'fs';
import path, {extname} from 'path';

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
export default app;
