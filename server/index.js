const mongoose = require('mongoose');
const env = require('dotenv');
env.config()
const app = require('./server.js')
const axios = require('axios')
const port = process.env.PORT || 3000;

// const server = require("http").Server(app);
const server = app.listen(port, ()=>{
  console.log(`server listening on port: ${port}`)
})


// DB CONNECTION
mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
    auth: {
      username: process.env.COSMOSDB_USER,
      password: process.env.COSMOSDB_PASSWORD
    },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false
  })
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch((err) => console.error(err));




// socket.io config
const io = require("socket.io")(server, {
  cors: {
      origin: '*',
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
  }
})

// This is a fuction that runs every single time a client connects our server
// and it's going to give a socket instance for each one of them
io.on("connection", socket => {
  socket.emit("socket-id", socket.id)

  // all socket.on()
  let lobbies = [];


  socket.on("join-lobby", room  => {
    socket.join(room)
    console.log(`User is in room: ${room}`)
  })


  socket.on("create-game", (data,room) => {

    const callTriviaApi = async () => {
      let result
      try {

        const response = await axios.get(`https://opentdb.com/api.php?amount=${data.amount}&category=${data.category}&difficulty=${data.difficulty}&type=${data.type}`);
        result = (response.data.results)
      }
      catch (err) {
          console.log(err)
      }
      console.log(result)
      // io.to(room).emit('questions-set', JSON.stringify(result))
    }

    callTriviaApi()

  })

  socket.on("save-game", data => {
    console.log(data.lobby_id)
  })

  socket.on("update-lobbies", data => {
    if(data) lobbies.push(data)
    // console.log("this is data: "+data)
    // console.log("this is lobbies: "+lobbies)
    io.emit('updated-lobbies', lobbies)
  })



})


