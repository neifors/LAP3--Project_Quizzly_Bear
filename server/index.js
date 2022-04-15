const server = require('./server.js')
const port = process.env.PORT || 3000;

require("./db_config/dbconfig")();

server.listen(port, ()=>{
    console.log(`server listening on port: ${port}`)
})
