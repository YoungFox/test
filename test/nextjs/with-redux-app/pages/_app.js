import { Provider } from 'react-redux'

import { useStore } from '../store'
// App.getInitialProps = (context) => {
//   console.log('======', context)
//   return {}
// }



export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
