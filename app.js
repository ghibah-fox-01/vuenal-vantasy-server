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
    dataUser[socket.id].username = data
  })
  socket.on('getScore',data =>{
    dataUser[socket.id].score =  data
  })
  //set the username of instance user
  socket.on('disconnect',(socket) => {
    console.log(`${dataUser[socket.id].username} has been disconnected`)
    delete dataUser[socket.id]
    // io.emit('disconnect', socket.id);
    //request to client for delete this player
  })
  // deleting user when disconnected
})
http.listen(PORT, () => {
  console.log(`server at port ${PORT}`)
})


// socket.on('disconnect', function () {
//   console.log('user disconnected: ', socket.id);
//   delete players[socket.id];
//   // emit a message to all players to remove this player
//   io.emit('disconnect', socket.id);
// });
