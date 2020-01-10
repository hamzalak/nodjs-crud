// load up the express framework and body-parser helper

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
// create an instance of express to serve our end points
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = 3001 ; 
////use of mogoose
const dbConfig = require('./mongoose-config/mongo-config.js');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.url,  { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => {
    console.log("Successfully connected to MongoDB.");    
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});
//**********************************************
app.use(cors({
  origin: 'http://localhost:3000' 
}));
/*********************************socket io logic****************************/

const server = http.createServer(app);
    /********************************************************/
    const io = socketIo(server); 
    const getApiAndEmit = async socket => {

      try {
        const res = await  axios.get(
          `http://localhost:3001/products`
        ); 
        socket.emit("FromAPI", res.data );  
      } catch (error) {
        console.error(`Error: ${error.code}`);
      }
    };
    /*******************************************/
    let interval;
    io.on("connection", socket => {
        console.log("New client connected");
        if (interval) {
        clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000);
        socket.on("disconnect", () => {
        console.log("Client disconnected");
        });
     }) ; 

/***********************************************************************/
// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require('fs');

// configure our express instance with some body-parser settings 
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is where we'll handle our various routes from
const routes = require('./routes/routes.js')(app, fs);

// finally, launch our server on port 3001.
server.listen(port, () => console.log(`Listening on port ${port}`));

 
  


