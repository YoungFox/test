var counter1 = require('./util/counter');
var counter2 = require('./util/counter');
var http = require('http')

const url = require('url')

console.log(counter1.count());
console.log(counter2.count());
console.log(counter1.count());
console.log(counter2.count());

console.log(process.argv)

console.log(url.parse('http://user:pass@host.com.8080/p/a/t/h?query=string#hash'))

// http.createServer(function (request, response){
//     var body = []
//     console.log(request.method)
//     console.log(request.headers)

//     request.on('data', function (chunk){
//         body.push(chunk)
//     })

//     request.on('end', function(){
//         body = Buffer.concat(body)
//         console.log(body.toString())
//     }).listen(80)
// })

process.on('uncaughtException', function (err) {
    console.log('Error: %s', err.message);
});

setTimeout(function (fn) {
    fn();
});