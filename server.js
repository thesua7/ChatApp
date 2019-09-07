var express = require('express');

var app = express();

app.use(express.static(__dirname));
//Static __dirname = Current Directory

var messages = [
    {name: "Sani",message: "Nashita My Lov!"},
    {name: "Sani",message: "I miss seeing u!"} 
]

app.get('/messages',(req,res) => {

    res.send(messages);
})

var server = app.listen(3010,() => {
    console.log("Server is listening on port",server.address().port)


})







// app.listen(3010)
// {
//     console.log("Hm Listening!");

// }
