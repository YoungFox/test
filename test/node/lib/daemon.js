let cp = require('child_process')
const path = require('path')
let worker


function spawn(server, config) {
    worker = cp.spawn('node', [server, config], {
        stdio: 'inherit',
        shell: true
    })

    worker.on('exit', function (code) {
        if (code !== 0) {
            spawn(server, config)
        }
    })
}

function main(argv) {
    spawn(path.resolve('lib/server.js'), argv[0])
    process.on('SIGTERM', function () {
        worker.kill()
        process.exit(0)
    })
}

main(process.argv.slice(2))