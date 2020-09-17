const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected')
})

http.listen(PORT, () => {
  console.log(`server at port ${PORT}`)
})