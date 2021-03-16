import Page from '../components/page'
import { initializeStore } from '../store'

export default function SSR() {
  return (
    <div>
      SSR
      <Page />
    </div>
  )
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export async function getServerSideProps({req, res}) {
  // console.log(req)
  const user = req.session;
  const userinfo = await fetch('http://localhost:3000/api/getuserinfo',  {
    ...req
  })
  const data = await userinfo.json()
  // console.log(data)


  if (!data.id) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  dispatch({
    type: 'TICK',
    light: false,
    lastUpdate: Date.now(),
  })

  return { props: { initialReduxState: reduxStore.getState() } }
}
