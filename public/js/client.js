 const socket = io('http://localhost:8000');
// const socket = io('https://fe6b-2404-7c80-3c-2d47-60a9-4e65-4ce1-6796.ngrok-free.app');


const form = document.getElementById('form');
const messageInput = document.getElementById('messageinput');
const messageContainer = document.querySelector('.container');
var audio = new Audio('/audio/yah le.mp3');
var leftAudio = new Audio('/audio/boom.mp3');
var kehaale = new Audio('/audio/kehaale.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);


    // used for auto scroll
    messageContainer.scrollTop = messageContainer.scrollHeight;

    // if messahe on left lay audio
    if (position == 'left') {
        audio.play();
    }
};

// Prompt for user's name and emit 'new-user-joined' event
let name;
while (!name) {
    name = prompt('Enter your name to join');
    if (!name) {
        alert('Name is required to join the chat!');
    }
}
socket.emit('new-user-joined', name);

// Handle user-joined event
// socket.on('user-joined', name => {
//     kehaale.play();
//     append(`${name} joined the chat`, 'right');
// });
// Handle user-joined event
socket.on('user-joined', name => {
    kehaale.play();
    append(`<b style="color:#ffffff;text-shadow: 2px 3px 15px black;">${name}</b> joined the chat`, 'right');
});

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();

    // Check if the message is empty
    if (message === '') {
        alert('Message cannot be empty!');
        return;
    }

    // Append the message from this user
    // append(`You: ${message}`, 'right');
    // Append the message from this user (yourself)
    append(`<b style="color:#2de12d;text-shadow: 2px 3px 15px black;">You:</b> ${message}`, 'right');


    // Emit the message to the server
    socket.emit('send', message);

    // Clear the input field
    messageInput.value = '';
});

// Handle receive event
// socket.on('receive', data => {
//     append(`${data.name}: ${data.message}`, 'left');
// });
// Handle receive event
socket.on('receive', data => {
    append(`<b style="color:#00d7ff;text-shadow: 2px 3px 15px black;">${data.name}:</b> ${data.message}`, 'left');
});


// Handle user-left eventgh
// socket.on('user-left', name => {
//     append(`${name} left the chat`, 'left');
//     leftAudio.play();
//     audio.pause();
//     audio.currentTime = 0;
// });


// Handle user-left event
socket.on('user-left', name => {
    append(`<b style="color:#e8ff00;text-shadow: 3px 2px 15px #000000;">${name}</b> left the chat`, 'left');
    leftAudio.play();
    audio.pause();
    audio.currentTime = 0;
});

