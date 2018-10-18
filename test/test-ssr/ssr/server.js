const Koa = require('koa');
const createApp = require('./build/server-bundle.js');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

const app = new Koa();

const main = ctx => {
    const vueApp = createApp(ctx);
    var context = {
        title: 'testSSR',
        meta: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
    }

    renderer.renderToString(vueApp, context, (err, html) => {
        if (err) {
            console.log(err);
            ctx.throw(500);
            return
        }
        ctx.response.type = 'html';
        ctx.response.body = html;
    })
}

app.use(main);
app.listen(3000);