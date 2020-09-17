const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

const wordGenerator = require('./helpers/wordgen.js');
//tinggal panggil wordGenerator()
//returning array of 10 random words

let dataUser = [];

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('clientMessage', (data) => {
    console.log(data)
  })
  io.emit('someoneConnect', 'seseorang terhubung')
  io.emit('hai', 'ini server')
})

http.listen(PORT, () => {
  console.log(`server at port ${PORT}`)
})