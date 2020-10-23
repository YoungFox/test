import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Alert from '../components/alert'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>自我介绍</p>
        <Alert>12333333333</Alert>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}