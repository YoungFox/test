const Koa = require('koa')
const route = require('koa-route')

let app = new Koa()

let main = ctx => {
    // ctx.response.body = '1234'
    try {
        console.log(x)
    } catch (err) {
        // console.log(e)
        // throw new Error('报错啦！')
        // ctx.throw(400, '报错啦', { errcode: 0, name: 'ywl' })
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: '报错啦！'
        };
    }
}

app.use(route.get('/', main))
app.listen(4000)