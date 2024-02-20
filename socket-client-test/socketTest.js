const io = require('socket.io-client');

// Replace 'http://localhost:3000' with the actual URL of your socket server
const socket = io('http://localhost:5000', {
  transports: ['websocket'], // You can adjust the transports based on your server setup
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('msg-recieve', (message) => {
  console.log('Received message:', message);
});

// Replace 'USER_ID_TO_SEND_TO' with an actual user ID in your application
const recipientUserId = '65bfc7af84ef0ccd2c868c06';

// Emit an 'add-user' event to simulate adding a user
socket.emit('add-user', '65bfc9a574e8d96788df6389');
socket.emit('add-user', '65bfc7af84ef0ccd2c868c06');

// Emit a 'send-msg' event to simulate sending a message
socket.emit('send-msg', { to: recipientUserId, from:'65bfc9a574e8d96788df6389', msg: 'Hello, recipient!' });
socket.emit('send-msg', { to: '65bfc9a574e8d96788df6389', from:recipientUserId, msg: 'Hello, recipient2!' });

// Disconnect after a brief delay
setTimeout(() => {
  socket.disconnect();
}, 5000);
