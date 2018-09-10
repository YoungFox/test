const Koa = require('koa');
const app = new Koa();

const logger = (ctx ,next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next();
}

const logger1 = (ctx ,next) => {
    console.log('lg1');
    next();
    console.log('lg5');
}

const logger2 = (ctx, next) =>{
    console.log('lg2');
    next();
    console.log('lg4');
}

const main = ctx => {
    ctx.response.body = 'Hello World';
    console.log('lg3');
}

app.use(logger);
app.use(logger1);
app.use(logger2);
app.use(main);
app.listen(3000);