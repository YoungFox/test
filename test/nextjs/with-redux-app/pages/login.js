
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const useClock = () => {
  return useSelector(
    (state) => ({
      lastUpdate: state.lastUpdate,
      light: state.light,
      userInfo: state.userInfo
    }),
    shallowEqual
  )
}

export default function Index() {
  const { lastUpdate, light, userInfo } = useClock()
  // console.log('1111111', lastUpdate, light, userInfo)
  const router = useRouter()
  const dispatch = useDispatch()
  let a = useSelector(
    (state) => state.userInfo
  )
  // console.log(a)
  const xx = () => {
    let abx = dispatch({
      type: 'LOGIN'
    })
    Cookies.set('auth', 1)
    // const unserInfo = useSelector((state) => state.unserInfo)
    // console.log('uuuuu', unserInfo)
    // console.log('aaaaaa', abx, a, userInfo)
    if (process.browser) {
      router.push('/')
    }
  }

  return (
    <div onClick={xx}>aaaaaaaaa{a}</div>
  )
}
