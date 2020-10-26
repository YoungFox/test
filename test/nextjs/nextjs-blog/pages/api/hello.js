export default (req, res) => {
  res.status(200).json({ text: 'Hello',email: req.body.email })
}
