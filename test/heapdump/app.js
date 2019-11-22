const heapdump = require('heapdump')

let x = null
let count = 0

setInterval(function a(){
    const xx = x
    const unused = function (){
        if(xx){
            console.log('xx')
        }
    }
    // console.log(xx)
    heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
    x = {
        count: String(count++),
        leakStr: new Array(1e7).join('*'),
        leakMethod: function() {
            console.log('leakMessage')
        }
    }
}, 1000);