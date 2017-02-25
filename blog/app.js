
/**
 * Module dependencies.
 */

import path from 'path';
import logger from 'koa-logger';
import Router from 'koa-router';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
const app = new Koa();
const router = new Router();

// "database"

var posts = [];

// middleware

app.use(bodyParser());
app.use(logger());

// route middleware

router.get('/', list);
router.get('/post/new', add);
router.get('/post/:id', show);
router.post('/post', create);

app
  .use(views(path.join(__dirname, 'views'), {
    map: {
      html: 'swig'
    }
  }))
  .use(router.routes())
  .use(router.allowedMethods());

/**
 * Post listing.
 */

async function list (ctx, next) {
  await ctx.render('list', {
    posts: posts
  });
}

/**
 * Show creation form.
 */

async function add (ctx) {
  await ctx.render('new');
}

/**
 * Show post :id.
 */

async function show (ctx, next) {
  var post = posts[ctx.params.id];
  if (!post) ctx.throw(404, 'invalid post id');
  await ctx.render('show', { post: post });
}

/**
 * Create a post.
 */

async function create (ctx) {
  var post = await ctx.request.body;
  var id = posts.push(post) - 1;
  post.created_at = new Date();
  post.id = id;
  ctx.redirect('/');
}

// listen

if (!module.parent) app.listen(3000);
export default app;
