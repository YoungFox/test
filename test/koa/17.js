const Koa = require('koa');

const app = new Koa();

const main = ctx => {
    console.log(ctx);
    ctx.throw(500);
}

app.on('error', (err, ctx) => {
    console.error('我屮艸芔茻，报错啦！！！！', err);
});

app.use(main);

app.listen(3000);