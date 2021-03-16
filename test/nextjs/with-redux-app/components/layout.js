
import { useStore } from '../store'
import { useRouter } from 'next/router'
import Loading from '../components/loading'
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import useSWR from "swr"
import user from '../lib/user'

let isLogin = false


export default function Layout({ children, home }) {
  console.log('GGG')
  user()
  // if(aaa){
  //   // isLogin = true
  // }
  
  // console.log('11111', isLogin)
  // // useEffect(() => {
  //   console.log(router)
  //   if (!isLogin) {
  //     setTimeout(() => {
  //       router.push('login')
  //     }, 1000);

  //   }
  // })
  // if (!isLogin) {
  //   return (
  //     <Loading />
  //   )
  // }

  return (
    <div>{children}</div>
  )
}