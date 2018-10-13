const Koa = require('koa');
const app = new Koa();
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

const main = ctx => {
    const app = new Vue({
        data: {
            url: ctx.request.url

        },
        template: `<div>The visited URL is: {{ url }}2</div>`
    });
    ctx.response.body = 'Hello world';

    var context = {
        title: 'testSSR',
        meta: `<meta http-equiv="X-UA-Compatible" content="ie=edge">`
    }

    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            ctx.throw(500);
            return
        }
        ctx.response.type = 'html';
        ctx.response.body = html;
    })
}

app.use(main);
app.listen(3000);