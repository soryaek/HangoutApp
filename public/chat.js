// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message');
var user = document.getElementById('user');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', (event)=> {
  socket.emit('chat', {
      message: message.value,
      user: user.value
    });
  message.value = "";
});

message.addEventListener('keypress', () => {
  socket.emit('typing', user.value);
})

message.addEventListener('keypress' , (event) =>{
  if(event.key == 'Enter'){
    socket.emit('chat', {
        message: message.value,
        user: user.value
    });
    message.value = "";
  }
})

// Listen for events
socket.on('chat', data => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
