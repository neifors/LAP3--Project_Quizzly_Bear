const express=require('express');
const cors= require('cors');
const app=express();
app.use(cors("*"));
app.use(express.json());
const path = require('path');


const userRoutes = require("./controllers/users");
const gameRoutes = require("./controllers/games");

app.use("/users", userRoutes);
app.use("/games", gameRoutes);

const htmlIndexRoute = path.join(__dirname, '/src/template/index.html')
const cssRoute = path.join(__dirname, '/src/template/index.css')

app.get('/', (req, res)=>{
    res.sendFile(htmlIndexRoute)
})
app.get('/styles.css', (req, res) => {
    res.sendFile(cssRoute);
  });

// const server = require("http").Server(app);

// const io = require("socket.io")(server)

// io.on("connection", socket => {
//    console.log(socket.id)

   // all socket.on()

   // socket.on("join-lobby", room => {
   //    socket.join(room)
   // })

// })

module.exports= app

