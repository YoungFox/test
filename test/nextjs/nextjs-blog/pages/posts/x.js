import Link from 'next/link'
import Head from 'next/head'
import Layout1 from '../../components/layout1'

export default function X() {
  return (
    <Layout1>
      <Head>
        <title>XXXX</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout1>
  )
}
