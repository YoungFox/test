// import _ from 'lodash'
// import printMe from './print.js'
// import './style.css'

if (process.env.NODE_ENV !== 'production') {
  console.log('dddddddddddddddd')
}

function component() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    return element
  }).catch(error => 'An error occurred while loading the component')

  // var btn = document.createElement('buttotn')

  //   element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  //   btn.innerHTML = 'Click me and check the console!'
  //   btn.onclick = printMe

  // element.appendChild(btn)

  // return element
}

// document.body.appendChild(component())
component().then(component => {
  document.body.appendChild(component)
})

// if (module.hot) {
//   module.hot.accept('./print.js', function () {
//     console.log('Accepting the updated printMe module!');
//     printMe();
//   })
// }
