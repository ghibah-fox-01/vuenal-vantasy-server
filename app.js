const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3002;
const cors = require('cors');
app.use(cors());

const wordGenerator = require('./helpers/wordgen.js');
let dataUsers = [];
let id;
io.on('connection', (socket) => {
  id = socket.id
  console.log('a user connected')
  
  io.emit('GET_LIST_QUESTION', wordGenerator())


  socket.emit('GET_LIST_QUESTION', wordGenerator())
  
  socket.on('newUser', data => {
    dataUsers.push({
      id: id,
      name: data,
      score: 0
    })
    console.log(dataUsers)
    io.emit('GET_DATA_USER', dataUsers)
  })
  
  socket.on('foundWinner', (data)=>{
    let winnerName
    dataUsers.forEach((elem)=>{
      if(elem.name === data){
        winnerName = elem.name;
      }
    })
    dataUsers = [];
    io.emit('WINNER_USERNAME', winnerName)
  })
  
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
