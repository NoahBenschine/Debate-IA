export default function test(req, res) {

  res.status(200).json({ name: 'John Doe' })
  console.log(res);
}
