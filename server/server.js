const express=require('express');
const cors= require('cors');
const server=express();
server.use(cors("*"));
server.use(express.json());
const path = require('path');


const postRoutes = require('./routers/post')

server.use("/posts", postRoutes);

const htmlIndexRoute = path.join(__dirname, '/src/template/index.html')
const cssRoute = path.join(__dirname, '/src/template/index.css')

server.get('/', (req, res)=>{
    res.sendFile(htmlIndexRoute)
})
server.get('/styles.css', (req, res) => {
    res.sendFile(cssRoute);
  });

module.exports= server;

