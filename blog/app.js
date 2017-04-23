
/**
 * Module dependencies.
 */

const path = require('path');
const logger = require('koa-logger');
const Router = require('koa-router');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const app = module.exports = new Koa();
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

async function list (ctx) {
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

async function show (ctx) {
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
