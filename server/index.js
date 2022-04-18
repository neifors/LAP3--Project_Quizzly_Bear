const mongoose = require('mongoose');
const env = require('dotenv');
env.config()
const app = require('./server.js')
const axios = require('axios')
const port = process.env.PORT || 3000;

// const server = require("http").Server(app);

// socket.io config
const server = app.listen(port, ()=>{
  console.log(`server listening on port: ${port}`)
})

const io = require("socket.io")(server, {
  cors: {
      origin: '*',
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
  }
})


io.on("connection", socket => {
   console.log(socket.id)

   // all socket.on()

  socket.on("join-lobby", room => {
    socket.join(room)
    console.log(`User is in room: ${room}`)
  })

  socket.on("create-game", data => {

    const callTriviaApi = async () => {
      try {

        const response = await axios.get(`https://opentdb.com/api.php?amount=${data.amount}&category=${data.category}&difficulty=${data.difficulty}&type=${data.type}`);
        result = (response.data.results)
      }
      catch (err) {
          console.log(err)
      }
      io.in(data).emit('questions-set', result)
    }

    callTriviaApi()

  })
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
