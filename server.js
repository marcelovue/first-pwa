const http = require('http')
const fs   = require('fs')

let port = 9010
let folks = []
const server = http.createServer()
server.on('request', (req, res) => {
  console.log(`REQ: ${req.url}`)
  fs.readFile(`.${req.url}`, (err, data) => {
    if (err) {
      res.statusCode = 404
      res.end(''); return;
    }
    if (req.url.search(/\.js$/) !== -1)
      res.setHeader('content-type','application/javascript')
    if (req.url.search(/\.(png)|(ico)$/) !== -1) {
      res.setHeader('content-type','image/png')
      res.end(data, 'binary')
    }
    if (req.url.search(/\.(css)$/) !== -1)
      res.setHeader('content-type','text/css')
    res.end(data.toString('utf8'))
  })
})
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
