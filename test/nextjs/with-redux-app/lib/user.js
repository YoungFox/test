import useSWR from "swr"
// import Router from "next/router"
// import { useEffect } from "react"

export default function x() {
  const a = useSWR("/api/getuserinfo")
  // console.log(user)
  // useEffect(() => {
  //   if (!user) {
  //     Router.push('/');
  //   }
  // }, [user])
  // return {}
}