
import { useStore } from '../store'
import { useRouter } from 'next/router'
import Loading from '../components/loading'
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import useSWR from "swr"

export default function Layout({ children, home }) {
  console.log('GGG')
  const router = useRouter()
  // const store = useStore(pageProps.initialReduxState)
  let userInfo = useSelector((state) => state.userInfo)
  // console.log('xxxx', store)
  const { data: user, mutate: mutateUser } = useSWR("/api/getuserinfo");
  console.log('info:', user, user === undefined)
  let isLogin = !!userInfo
  console.log('11111', isLogin)
  if(user !== undefined){
    isLogin = isLogin || user.id
  }
  useEffect(() => {
    console.log(router)
    
    if (user !== undefined && !isLogin && process.browser) {
      setTimeout(() => {
        router.push('login')
      }, 1000);

    }
  })
  if (!isLogin) {
    return (
      <Loading />
    )
  }

  return (
    <div>{children}</div>
  )
}