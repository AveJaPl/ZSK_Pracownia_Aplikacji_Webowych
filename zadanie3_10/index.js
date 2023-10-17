const http = require('http')
const fs = require('fs/promises')
const PORT = 3000
const hostname = '127.0.0.1'

const server = http.createServer(async (req, res) => {

    const url = req.url
    if (req.method === 'GET') {
        if (url === '/') {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.write('<html><body><form action="/kontakt" method="POST"><input type="text" name="tekst"><button>wyslij</button></form></body></html>')
            res.end()
        } else if (url === '/dziekujemy') {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.write('<html><body><h1>Thank you page</h1></body></html>')
            res.end()

        } else if (url === '/api') {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify([{ obj: 'Obj1' }, { obj2: 'Obj2' }]))

        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Not Found' }))
        }
    } else if (req.method === 'POST' && url === '/kontakt') {
        const body = []
        req.on('data', chunk => {
            body.push(chunk)
        })
        req.on('end', async () => {
            const message = Buffer.concat(body).toString().split('=')[1]
            const filedir = `./contact/message-${Date.now().toString()}.txt`
            await fs.writeFile(filedir, message)
            res.statusCode = 302
            res.setHeader('Location', '/dziekujemy')
            return res.end()
        })
    }

})

server.listen(PORT, hostname, () => {
    console.log(`Server is running at ${hostname}:${PORT}`)
})