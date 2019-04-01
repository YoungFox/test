function parseURL(root, url) {
    let base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }

    parts = url.split('??')
    base = parts[0]

    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root, base, value)
    })

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames
    }
}

function outputFiles(pathnames, writer){
    (function next(i, len){
        if(i < len){
            let reader = fs.createReadStream(pathnames[i])

            reader.pipe(writer, {end: false})
            reader.on('end', function (){
                next(i+1, len)
            })
        }else{
            writer.end()
        }
    })(0, pathnames.length)
}

function validateFiles(pathnames, callback){
    (function next(i, len){
        if(i<len){
            fs.stat(pathnames[i], function(err, stats){
                if(err){
                    callback(err)
                }else if(!stats.isFile()){
                    callback(new Error())
                }else{
                    next(i+1, len)
                }
            })
        }else{
            callback(null, pathnames)
        }
    })(0, pathnames.length)
}

main(process.argv.slice(2))const fs = require('fs')
const path = require('path')
const http = require('http')

let MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
}

function main(argv) {
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'))
    var root = config.root || '.';
    var port = config.port || 80;
    console.log(port)

    http.createServer(function (request, response) {

        var urlInfo = parseURL(root, request.url)
        // console.log(urlInfo)

        validateFiles(urlInfo.pathnames, function (err, pathnames){
            if(err){
                response.writeHead(200)
                response.end(err.message)
            }else{
                response.writeHead(200,{
                    'Content-Type': urlInfo.mime
                })

                outputFiles(pathnames, response)
            }
        })

    }).listen(port)
}

function parseURL(root, url) {
    let base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }

    parts = url.split('??')
    base = parts[0]

    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root, base, value)
    })

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames
    }
}

function outputFiles(pathnames, writer){
    (function next(i, len){
        if(i < len){
            let reader = fs.createReadStream(pathnames[i])

            reader.pipe(writer, {end: false})
            reader.on('end', function (){
                next(i+1, len)
            })
        }else{
            writer.end()
        }
    })(0, pathnames.length)
}

function validateFiles(pathnames, callback){
    (function next(i, len){
        if(i<len){
            fs.stat(pathnames[i], function(err, stats){
                if(err){
                    callback(err)
                }else if(!stats.isFile()){
                    callback(new Error())
                }else{
                    next(i+1, len)
                }
            })
        }else{
            callback(null, pathnames)
        }
    })(0, pathnames.length)
}

main(process.argv.slice(2))const fs = require('fs')
const path = require('path')
const http = require('http')

let MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
}

function main(argv) {
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'))
    var root = config.root || '.';
    var port = config.port || 80;
    console.log(port)

    http.createServer(function (request, response) {

        var urlInfo = parseURL(root, request.url)
        // console.log(urlInfo)

        validateFiles(urlInfo.pathnames, function (err, pathnames){
            if(err){
                response.writeHead(200)
                response.end(err.message)
            }else{
                response.writeHead(200,{
                    'Content-Type': urlInfo.mime
                })

                outputFiles(pathnames, response)
            }
        })

    }).listen(port)
}

function parseURL(root, url) {
    let base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }

    parts = url.split('??')
    base = parts[0]

    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root, base, value)
    })

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames
    }
}

function outputFiles(pathnames, writer){
    (function next(i, len){
        if(i < len){
            let reader = fs.createReadStream(pathnames[i])

            reader.pipe(writer, {end: false})
            reader.on('end', function (){
                next(i+1, len)
            })
        }else{
            writer.end()
        }
    })(0, pathnames.length)
}

function validateFiles(pathnames, callback){
    (function next(i, len){
        if(i<len){
            fs.stat(pathnames[i], function(err, stats){
                if(err){
                    callback(err)
                }else if(!stats.isFile()){
                    callback(new Error())
                }else{
                    next(i+1, len)
                }
            })
        }else{
            callback(null, pathnames)
        }
    })(0, pathnames.length)
}

main(process.argv.slice(2))