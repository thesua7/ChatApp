var express = require('express');
var bodyParser = require('body-parser')

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(express.static(__dirname));
//Static __dirname = Current Directory

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exteded:false}))

var messages = [
    {name: "Sani",message: "Nashita My Lov!"},
    {name: "Sani",message: "I miss seeing u!"} 
]

app.get('/messages',(req,res) => {

    res.send(messages);
})

app.post('/messages',(req,res)=>{
    messages.push(req.body);
    io.emit('message',req.body);
    res.sendStatus(200);
})


io.on("connection",(socket)=>{
    console.log('user connected');
})

var server = http.listen(3010,() => {
    console.log("Server is listening on port",server.address().port)


})







// app.listen(3010)
// {
//     console.log("Hm Listening!");

// }
