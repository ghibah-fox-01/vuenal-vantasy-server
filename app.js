const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3002;
const cors = require('cors');
app.use(cors());

const wordGenerator = require('./helpers/wordgen.js');
//tinggal panggil wordGenerator()
//returning array of 10 random words
let dataUsers = [];
//v-for {{},{},{}} data in datas // data.score
let id;
io.on('connection', (socket) => {
  id = socket.id
  console.log('a user connected')
  
  io.emit('GET_LIST_QUESTION', wordGenerator())

  socket.on('newUser', data => {
    dataUsers.push({
      id: id,
      name: data,
      score: 0
    })
    console.log(dataUsers)
    io.emit('GET_DATA_USER', dataUsers)
  })
  //set the username of instance user

  socket.on('incrementScore', data => {
    dataUsers.forEach((elem)=>{
      if(elem.name===data){
        elem.score += 10
      }
    console.log(dataUsers)
      io.emit('GET_DATA_USER', dataUsers)
    })
  })
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
