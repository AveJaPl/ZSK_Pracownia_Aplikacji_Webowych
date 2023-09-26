const http = require('http')
const PORT = 3000
const hostname = 'localhost'
const server = http.createServer((req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end("Miś Maliś król")
})

server.listen(PORT, hostname,()=>{
    console.log(`Server is running at ${hostname} at port ${PORT}`)
})
