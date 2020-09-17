const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

const wordGenerator = require('./helpers/wordgen.js');
//tinggal panggil wordGenerator()
//returning array of 10 random words
let dataUser = {};
//v-for {{},{},{}} data in datas // data.score
io.on('connection', (socket) => {
  console.log('a user connected')
  dataUser[socket.id] = {
    id: socket.id,
    username: '',
    score: 0
  }
  io.on('disconnect',(socket) => {
    delete dataUser[socket.id]
  })
})

http.listen(PORT, () => {
  console.log(`server at port ${PORT}`)
})
