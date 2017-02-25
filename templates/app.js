import path from 'path';
import views from 'koa-views';
import Koa from 'koa';
const app = new Koa();

// setup views, appending .ejs
// when no extname is given to render()

app
  .use(views(path.join(__dirname, 'views'), {
    extension: 'ejs'
  }));

// dummy data

var user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

// render

app.use(async (ctx) => {
  await ctx.render('user', { user: user });
});

if (!module.parent) app.listen(4000);
export default app;
