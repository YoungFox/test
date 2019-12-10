// var obj = new Proxy({}, {
//     // get: function (target, key, receiver) {
//     //     console.log(target, key )
//     //     return Reflect.get(target, key, receiver);
//     // },
//     set: function (target, key, value, receiver) {
//         console.log(receiver)
//         return Reflect.set(target, key, value, receiver);
//     }
// })


// // var obj = new Proxy({}, {
// //     get: function (target, key, receiver) {
// //         console.log(`getting ${key}!`);
// //         return Reflect.get(target, key, receiver);
// //     },
// //     set: function (target, key, value, receiver) {
// //         console.log(`setting ${key}!`);
// //         return Reflect.set(target, key, value, receiver);
// //     }
// // });


// obj.count = 1
// ++obj.count

// var target = {}
// var handler = {}

// var proxy = new Proxy(target, handler)
// proxy.a = 'b'
// console.log(target.a)


// proxy作为其他对象的原型对象

// var proxy = new Proxy({}, {
//     get: function(target, property) {
//         return 35
//     }
// })

// let obj = Object.create(proxy)

// console.log(obj.time)

// 同一个拦截器函数，可以设置拦截多个操作

// var handler = {
//     get: function(target, name){
//         if(name === 'prototype'){
//             return Object.prototype
//         }

//         return 'Hello, ' + name
//     },

//     apply: function(target, thisBinding, args){
//         return args[0]
//     },

//     construct: function(target, args){
//         return {value: args[1]}
//     }
// }


// var proxy = new Proxy(function(x, y) {
//     return x + y
// }, handler)

// console.log(proxy(1, 2))
// console.log(new proxy(1, 2))

// console.log(proxy.prototype === Object.prototype)
// console.log(proxy.foo === 'Hello, foo')

// var person = {
//     name : 'zhangsan'
// }

// var proxy = new Proxy(person, {
//     get: function(target, property) {
//         if(property in target){
//             return target[property]
//         } else {
//             throw new ReferenceError('Property \"' + property + '\" does not exist.')
//         }
//     }
// })
// console.log(proxy.name, proxy.age)



// ...扩展运算符

// function createArray(...elements) {
//     let handler = {
//         get(target, propKey, receiver) {
//             let index = Number(propKey)
//             if(index < 0) {
//                 propKey = String(target.length + index)
//             }

//             return Reflect.get(target,propKey, receiver)
//         }
//     }
//     let target = []
//     target.push(...elements)
//     return new Proxy(target, handler)
// }

// let arr = createArray('a', 'b', 'c')

// console.log(arr[-1])


// proxy 链式调用！！！

// var a = {}
// var pipe = (function (){
//     return function (value){
//         var funcstack = []
//         var proxy = new Proxy({}, {
//             get: function(pipeObject, fnName){
//                 if(fnName === 'get'){
//                     return funcstack.reduce(function(val, fnc){
//                         return fnc(val)
//                     },value)
//                 }

//                 funcstack.push(a[fnName])
//                 return proxy
//             }
//         })
//         return proxy
//     }
// })()

// a.double = n=> n * 2
// a.pow = n => n * n
// a.reverseInt = n => n.toString().split("").reverse().join("") | 0

// console.log( pipe(3).double.pow.reverseInt.get )


// proxy 生成dom

// const dom = new Proxy({}, {
//     get(target, property) {
//         return function (attrs = {}, ...children) {
//             const el = document.createElement(property)
//             for (let prop of Object.keys(attrs)) {
//                 el.setAttribute(prop, attrs[prop])
//             }

//             for (let child of children) {
//                 if (typeof child === 'string') {
//                     child = document.createTextNode(child)
//                 }

//                 el.appendChild(child)
//             }

//             return el
//         }
//     }
// })

// const el = dom.div({},
//     'Hello,my name is ',
//     dom.a({ href: '//www.xxx.com' }, 'Mark'),
//     '. I like:',
//     dom.ul({}, dom.li({}, 'The web'), dom.li({}, 'Food'), dom.li({}, '...actually that\' it')))

// document.body.appendChild(el)


// let validator = {
//     set: function (obj, prop, value) {
//         if (prop === 'age') {
//             if (!Number.isInteger(value)) {
//                 throw new TypeError('The age is not an integer')
//             }

//             if (value > 200) {
//                 throw new RangeError('The age seems invalid')
//             }
//             obj[prop] = value
//         }
//     }
// }

// let person = new Proxy({}, validator)

// try {
//     person.age = 100

//     console.log(person.age)
//     person.age = 'young'

//     console.log(person.age)
//     person.age = 300
// } catch (error) {
//     console.log(error)
// }


// 防止内部属性外部读写

const handler = {
    get(target, key){
        invariantt(key, 'get')
        return target[key]
    },
    set(target, key, value){
        invariantt(key, 'set')
        target[key] = value
        return true
    }
}

function invariantt(key, action){
    if(key[0] === '_') {
        throw new Error(`Invalid attemp to ${action} private "${key} property`)
    }
}

const target = {}
const proxy = new Proxy(target, handler)
// proxy._prop
proxy._prop = 'c'