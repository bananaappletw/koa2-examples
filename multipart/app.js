/**
 * Multipart example downloading all the files to disk using async-busboy.
 * If all you want is to download the files to a temporary folder,
 * just use https://github.com/cojs/multipart instead of copying this code
 * as it handles file descriptor limits whereas this does not.
 */

const os = require('os');
const path = require('path');
const Koa = require('koa');
const fs = require('co-fs');
const parse = require('async-busboy');
const saveTo = require('save-to');

const app = module.exports = new Koa();

app.use(async ctx => {
  // parse the multipart body
  const parts = await parse(ctx.req);

  // create a temporary folder to store files
  const tmpdir = path.join(os.tmpdir(), uid());

  // make the temporary directory
  await fs.mkdir(tmpdir);

  // list of all the files
  const files = [];
  let file;

  // take each part as a stream
  for(let part of parts.files) {
    // filename for this part
    files.push(file = path.join(tmpdir, part.filename));
    // save the file
    await new Promise((resolve, reject) => {
      saveTo(part,file, (err, data) => {
        if(err) reject(err);
        resolve(data);
      });
    });
  }

  // return all the filenames as an array
  // after all the files have finished downloading
  ctx.response.body = files;
});

if(!module.parent) app.listen(3000);

function uid() {
  return Math.random().toString(36).slice(2);
}