export default async function handler(req, res) {
  const { slug } = req.query
  const result = await fetch(`http://test-api-ye_chen.new-frp.bitfunc.com:7080/api/${slug.join('/')}`)
  // console.log(result)
  const json = await result.json()
  // console.log(json)
  // res.end('12')
  res.status(200).json(json)
}