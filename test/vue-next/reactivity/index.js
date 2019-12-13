import {effect, reactive} from './reactivity'

// console.log(effect)
let origin = {
    name: 'ywl',
    age: 18
}

let value = reactive(origin)


let logNameChange = ()=>{
    const name = value.name

    console.log(`set name to ${name}`)
}

let logAgeChange = () => {
    const age = value.age
    console.log(`set age to ${age}`)
}

effect(logNameChange)
effect(logAgeChange)

value.name = 'world'
value.age = 19