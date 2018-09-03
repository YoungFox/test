const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const main = ctx => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    ctx.response.body = 'Hello World';
}

app.use(route.get('/', main));

app.listen(3000);