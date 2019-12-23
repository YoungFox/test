// 单例

// var Singleton = function( name ) {
//     this.name = name
//     this.instance = null
// }

// Singleton.prototype.getName = function(){
//     return this.name
// }

// Singleton.getInstance = function (name) {
//     console.log(this)
//     if(!this.instance){
//         this.instance = new Singleton(name)
//     }
//     return this.instance
// }

// var a = Singleton.getInstance('sven1')
// var b = Singleton.getInstance('sven2')

// console.log(a === b)



// var Singleton = function(name){
//     this.name = name
// }

// Singleton.prototype.getName = function(){
//     console.log(this.name)
// }

// Singleton.getInstance = (function(){
//     var instance = null
//     return function(name){
//         if(!instance){
//             instance = new Singleton(name)
//         }
//         return instance
//     }
// })()

// var a = Singleton.getInstance('sven1')
// var b = Singleton.getInstance('sven2')

// console.log(a === b)


// 用代理实现单例模式

// var CreateDiv = function(html){
//     this.html = html
//     this.init()
// }

// CreateDiv.prototype.init = function(){
//     var div = document.createElement('div')
//     div.innerHTML = this.html
//     document.body.appendChild(div)
// }

// var ProxySingletonCreateDiv = (function(){
//     var instance
//     return function(html){
//         if(!instance){
//             instance = new CreateDiv(html)
//         }

//         return instance
//     }
// })()

// var a = new ProxySingletonCreateDiv('sven1')
// var b = new ProxySingletonCreateDiv('sven2')

// console.log(a === b)



// 惰性单例！！！

// var createLoginLayer = (function(){
//     var div
//     return function(){
//         if(!div){
//             div = document.createElement('div')
//             div.innerHTML = '我是登录浮窗'
//             div.style.display = 'none'
//             document.body.appendChild(div)
//         }
//         return div
//     }
// })()

// document.getElementById('loginBtn').onclick = function(){
//     var loginLayer = createLoginLayer()
//     loginLayer.style.display = 'block'
// }


// 通用惰性单例

var getSingle = function(fn){
    var result
    return function(){
        return result || (result = fn.apply(this, arguments))
    }
}

var createSingleIframe = getSingle(
    function(){
        console.log('xxx')
        var iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        return iframe
    }
) 

document.getElementById('loginBtn').onclick = function(){
    var loginLayer = createSingleIframe()
    loginLayer.src = 'https://www.baidu.com'
}


var bindEvent = getSingle(function (){
    document.onclick = function(){
        console.log('body')
    }
})

var render = function(){
    console.log('开始渲染')
    bindEvent()
}

render()
render()
render()