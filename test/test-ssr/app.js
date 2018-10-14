const Vue = require('vue');
const server = require('express')();


const renderer = require('vue-server-renderer').createRenderer();

server.get('*', (req, res)=>{
    const app = new Vue({
        data: {url: req.url},
        template: `<div>Hello World</div>`
    });

    renderer.renderToString(app, (err, html)=>{
        if (err) throw err
    
        // console.log(html);
        res.end(`
            <!DOCTYPE html>
            <html>
                <head><title>Hello</title></head>
                <body>${html}</body>
            </html>
        `);
    });
});

server.listen(8090);