// import _ from 'lodash'
import Print from './print'
// import printMe from './print.js'
// import './style.css'

// if (process.env.NODE_ENV !== 'production') {
//   console.log('dddddddddddddddd')
// }

// let a = require('../library')
// console.log(a)

function component() {
  // const _ = await import(/* webpackChunkName: "lodash" */ 'lodash')

  var element = document.createElement('div');
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  var btn = document.createElement('buttotn')
  var br = document.createElement('br')

  btn.innerHTML = 'Click me and check the console!'
  element.innerHTML = join(['Hello', 'webpack'], ' ')

  element.appendChild(br)
  element.appendChild(btn)

  btn.onclick = Print.bind(null, 'Hello webpack!')
  // btn.onclick = e => import(/* webpackChunkName: "print"*/ './print').then(module => {
  //   var print = moodule.default
  //   print()
  // })
  return element
};


//   element.innerHTML = _.join(['Hello', 'webpack'], ' ')

//   btn.innerHTML = 'Click me and check the console!'
//   btn.onclick = printMe

// element.appendChild(btn)

// return element

document.body.appendChild(component())
// component().then(component => {
//   document.body.appendChild(component)
// })

// if (module.hot) {
//   module.hot.accept('./print.js', function () {
//     console.log('Accepting the updated printMe module!');
//     printMe();
//   })
// }
