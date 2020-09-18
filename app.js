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
let id;
//v-for {{},{},{}} data in datas // data.score
io.on('connection', (socket) => {
  console.log('a user connected')
  dataUser[`${socket.id}`] = {
    id: socket.id,
    username: '',
    score: 0
  }
  socket.emit('GET_DATA_USER', dataUser)

  //creating instance of connected user
  socket.emit('GET_LIST_QUESTION' , wordGenerator())

  socket.on('newUser', data => {
    dataUser[socket.id].username = data.username
    socket.emit('GET_DATA_USER', dataUser)

  })
  //set the username of instance user

  socket.on('getScore',data =>{

    dataUser[socket.id].score =  data
    console.log(dataUser)
    socket.emit('GET_DATA_USER', dataUser)
  })
  //listening getScore action from client to get scoring

  socket.on('disconnect',(socket) => {
    console.log('disconnected event')
    console.log(socket)
    console.log(socket.id)
    console.log(`${socket.id} has been disconnected`)
    delete dataUser[socket.id]
    // io.emit('disconnect', socket.id);
    //request to client for delete this player
  })

  id = socket.id
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
