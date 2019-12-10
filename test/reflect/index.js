// var myObject = {
//     foo: 1,
//     bar: 2,
//     get baz() {
//         return this.foo + this.bar
//     }
// }

// var myReceiverObject = {
//     foo: 4,
//     bar: 4
// }

// console.log(
//     Reflect.get(myObject, 'baz', myReceiverObject)
// )

// Reflect.get(1, 'ff')

// let p = {
//     a: 'a'
// }

// let handler = {
//     set(target, key, value, receiver) {
//         console.log('set')
//         Reflect.set(target, key, value, receiver)
//     },
//     defineProperty(target, key ,attribute){
//         console.log('defineProperty')
//         Reflect.defineProperty(target, key, attribute)
//     }
// }
// let obj = new Proxy(p, handler)
// obj.a = 'A'

// has 方法

// var myObject = {
//     foo: 1
// }

// console.log(Reflect.has(myObject, 'foo'))

// function FancyThing(){}
// const myObj = new FancyThing()

// console.log(
//     Reflect.getPrototypeOf(myObj) === FancyThing.prototype
// )


// setPrototypeOf

// const myObj = {}

// Reflect.setPrototypeOf(myObj, Array.prototype)

// console.log(myObj.length)


// const ages = [11, 33, 12, 54, 18, 96]

// const youngest = Reflect.apply(Math.min, Math, ages)
// console.log(youngest)

// const myObject = {}

// console.log(Reflect.isExtensible(myObject))


// ownKeys

// var myObj = {
//     foo: 1,
//     bar: 2,
//     [Symbol.for('baz')]: 3,
//     [Symbol.for('bing')]: 4
// }

// console.log(Reflect.ownKeys(myObj))


// 观察者模式

const quenedObservers = new Set()

const observer = fn => quenedObservers.add(fn)

const observable = obj => new Proxy(obj, {set})

function set(target, key, value, receiver){
    const result = Reflect.set(target, key, value, receiver)

    quenedObservers.forEach(observer => observer());

    return result
}

const person = observable({
    name: '张三',
    age: 20
})

function print(){
    console.log('第一个回调', person.name, person.age)
}

function x() {
    console.log('第二个回调')
}

observer(print)

observer(x)

person.name = '李四'