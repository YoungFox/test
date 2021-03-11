import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Alert from '../components/alert'
// import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import useSWR from 'swr'

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   console.log(allPostsData)
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

export async function getServerSideProps(context) {
  
  return {
    props: {
      allPostsData: []
    }, // will be passed to the page component as props
  }
}

export default function Home({ allPostsData }) {
  const { data, error } = useSWR('/api/x/index/coinsincome', fetch)
  console.log(data)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      <h1 className="title">
        Read{' '}
        <Link href="/posts/x">
          <a>this page!</a>
        </Link>
      </h1>
        <p>self</p>
        <Alert type="error">12333333333</Alert>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>

      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      {/* <section>
        <form action="api/hello" method="post" >
          <input name="email" type="text"></input>
          <input type="submit" value="提交"></input>
        </form>
      </section> */}

    </Layout>
  )
}