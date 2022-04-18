const io = require("./index")

io.on("connection", socket => {
   console.log(socket.id)
 
   // all socket.on()
 
 
   socket.on("join-lobby", room => {
     socket.join(room)
     console.log(`User is in room: ${room}`)
   })
 
 
   socket.on("create-game", data => {
 
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
       io.in(data).emit('questions-set', JSON.stringify(result))
     }
 
     callTriviaApi()
 
   })
 
   socket.on("save-game", data => {
 
   })
 
 
 })
