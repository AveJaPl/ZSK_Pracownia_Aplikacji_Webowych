const http = require('http')
const fs = require('fs').promises
const PORT = 3000
const hostname = 'localhost'
const server = http.createServer(async(req,res)=>{
    try{
        const data = await fs.readFile('index.html', 'utf-8')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
    }catch(err){
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('Wystąpił Błąd podczas odczytywania pliku!' + '\n'+err)
        return
    }
    
})

server.listen(PORT, hostname,()=>{
    console.log(`Server is running at ${hostname} at port ${PORT}`)
})
