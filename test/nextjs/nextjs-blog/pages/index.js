import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Alert from '../components/alert'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import useSWR from 'swr'
import { DatePicker } from 'antd'
import { Rate } from 'antd'
import { Collapse } from 'antd';
import { Carousel } from 'antd';
import React, { useState, useEffect } from 'react';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`



export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  console.log(allPostsData)
  return {
    props: {
      allPostsData
    }
  }
}

// export async function getServerSideProps(context) {

//   return {
//     props: {
//       allPostsData: []
//     }, // will be passed to the page component as props
//   }
// }

function Home(props) {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR('/api/x/index/coinsincome', fetcher)
  console.log(data)
  fetch('/api/x/index/coinsincome').then(d => {
    console.log('xxx', d)
    return  d.json()
  }).then(myjson => {
    console.log(myjson)
  })
  const [count, setCount] = useState(0);


  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

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
     
      <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      </div>
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
          {props.allPostsData.map(({ id, date, title }) => (
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
      <DatePicker />
      <Rate disabled defaultValue={2} />

      <Rate defaultValue={3} />
      <span className="ant-rate-text">allowClear: true</span>
      <br />
      <Rate allowClear={false} defaultValue={3} />
      <span className="ant-rate-text">allowClear: false</span>
      {/* <section>
        <form action="api/hello" method="post" >
          <input name="email" type="text"></input>
          <input type="submit" value="提交"></input>
        </form>
      </section> */}

      <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header="This is panel header 1" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>

    </Layout>
  )
}

export default Home