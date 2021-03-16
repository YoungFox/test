export default (req, res) => {
  // console.log(req.cookies)
  let cookies = req.cookies
  if (cookies && cookies.auth) {
    res.status(200).json({ id: 'xxx', email: 1111111111111 })
  } else {
    res.status(200).json({})
  }
}
