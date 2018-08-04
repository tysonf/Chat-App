//Client Side

//Make Connection
var socket = io.connect("http://localhost:4000");

//Get Data
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var sendButton = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Event Handles

//Listen for click and sends data to server
sendButton.addEventListener('click', function(){
    //data from chat
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

//Listens for key typing and send data to server
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value)
});

//Listen to server

socket.on('chat',function(data){
    //get rid of user is typing feedback message
    feedback.innerHTML = '';
    //add output to chatbox
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
socket.on('typing', function(data){
    //user is typing feedback message
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});