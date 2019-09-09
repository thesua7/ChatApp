var express = require('express');
var bodyParser = require('body-parser')

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');

var dbUrl = 'mongodb+srv://thesua7:arsenal23@cluster0-sutdw.mongodb.net/test?retryWrites=true&w=majority';

app.use(express.static(__dirname));
//Static __dirname = Current Directory

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({exteded:false}))

var Message = mongoose.model('Message',{
    name : String,
    message : String
})

var messages = [
    {name: "Sani",message: "Nashita My Lov!"},
    {name: "Sani",message: "I miss seeing u!"} 
]

app.get('/messages',(req,res) => {
    
    res.send(messages);
})

app.post('/messages',(req,res)=>{
    
    
    var message = new Message(req.body)
    message.save((err =>{
        if(err){
            sendStatus(500);
            console.log("OK!")
            messages.push(req.body);
            io.emit('message',req.body);
            res.sendStatus(200);
        }

            
        
    }))

})


io.on("connection",(socket)=>{
    console.log('user connected');
})

mongoose.connect(dbUrl,(err) =>{
    console.log('mongoDb connection successful');
})



var server = http.listen(3010,() => {
    console.log("Server is listening on port",server.address().port)


})







// app.listen(3010)
// {
//     console.log("Hm Listening!");

// }
