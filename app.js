const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3002;
const cors = require('cors');
app.use(cors());

const wordGenerator = require('./helpers/wordgen.js');
//tinggal panggil wordGenerator()
//returning array of 10 random words
let dataUser = {};
//v-for {{},{},{}} data in datas // data.score
let id;
io.on('connection', (socket) => {
  id = socket.id
  console.log('a user connected')
  dataUser[`${socket.id}`] = {
    id: socket.id,
    username: '',
    score: 0
  }
  // socket.emit('GET_DATA_USER', {dataUser, id})
  io.emit('GET_DATA_USER', {dataUser, id})

  //creating instance of connected user
  // socket.emit('GET_LIST_QUESTION', wordGenerator())

  socket.emit('GET_LIST_QUESTION', wordGenerator())
  
  socket.on('newUser', data => {
    dataUser[socket.id].username = data.username
    // socket.emit('GET_DATA_USER', {dataUser, id})
    io.emit('GET_DATA_USER', {dataUser, id})
  })
  //set the username of instance user

  socket.on('getScore', data => {
    console.log('------------------')
    dataUser[socket.id].score = data
    console.log(dataUser)
    // socket.emit('GET_DATA_USER', {dataUser, id})
    io.emit('GET_DATA_USER', {dataUser, id})
  })
  // socket.on('endOfGame', data => {
  //   dataUser = {}
  //   socket.emit('GET_DATA_USER',dataUser)
  // })
  //listening getScore action from client to get scoring

  socket.on('disconnect', () => {
    socket.disconnect(true);
  })

  console.log(`${dataUser[`${id}`].id} has joinned`)
  //creating instance of connected user
  // console.log(dataUser[socket.id])
  // socket.on('getUsername', data => {
  //   dataUser[socket.id].username = data
  // })
  //set the username of instance user

  // socket.on('getScore',data =>{
  //   dataUser[socket.id].score =  data
  // })
  //listening getScore action from client to get scoring

  // socket.on('returnFinalData', data => {
  //   dataUser
  // })
  // socket.on('disconnect',socket => {
  //   // console.log(dataUser[`${id}`].id)
  //   console.log(`${dataUser[`${id}`].id} has been disconnected`)
  //   delete dataUser[`${id}`]
  //   console.log('user tersisa')
  //   console.log(dataUser)
  //
  // })
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
// })
