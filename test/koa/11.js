const Koa = require('koa');
const compose = require('koa-compose');

const logger = (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
}

const main = ctx => {
    ctx.response.body = 'Hello World111';
}

const middlewares = compose([logger,main]);

const app = new Koa();

app.use(middlewares);

app.listen(3000);