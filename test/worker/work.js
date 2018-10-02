// web worker
self.onmessage = function (event){
    var data = event.data;
    setTimeout(() => {
        this.postMessage('成功');
    }, 1000);
}