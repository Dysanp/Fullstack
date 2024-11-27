const http = require('http')

const app = http.createServer((request,reponse) => {
    response.writeHead(200, {'Content-Type':'text/plain'})
    respose.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)