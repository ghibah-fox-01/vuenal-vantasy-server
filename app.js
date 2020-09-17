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
  //creating instance of connected user
  socket.on('getUsername',data => {
    dataUser[socket.id].username=data
  })
  //set the username of instance user
  io.on('disconnect',(socket) => {
    delete dataUser[socket.id]
  })
  // deleting user when disconnected
})
http.listen(PORT, () => {
  console.log(`server at port ${PORT}`)
})
