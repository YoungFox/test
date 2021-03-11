export default (req, res) => {
  console.log(req, res)
  res.status(200).json({ text: 'Hello',email: req.body.email })
}
