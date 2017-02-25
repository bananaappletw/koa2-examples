import Koa from 'koa';
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

if (!module.parent) app.listen(3000);
export default app;
