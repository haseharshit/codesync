require('dotenv').config();
const express= require("express");
const router= require("./routes");
const {Server} = require('socket.io')
const app=express();
const cors =require("cors");
const http=require('http');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(router);
const server =http.createServer(app);
const io= new Server(server);
let InitialCode=
`
#include<iostream>
using namespace std;
int main(){
    cout<<"Hello World!";
    return 0;
}
`;

//Sync whatever is written already
io.on('connection', (socket)=>{
    console.log("Socket Connected", socket.id);
    io.emit("code sync", InitialCode);
    socket.on('code change', (msg) => {
        console.log('message: ' + msg);
        InitialCode=msg;
        io.emit('code change', msg);

      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})

server.listen(process.env.PORT, ()=> console.log("Listening on Port", process.env.PORT));

// app.listen(