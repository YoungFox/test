import '../styles/global.css'
import 'antd/dist/antd.css'
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}
App.getInitialProps = (context) => {
    console.log('======', context)
    return {}
}
