
'use strict';

const {io} = require('socket.io-client');
const handler = require('./handler');

const socket = io.connect('http://localhost:3003/caps');

socket.emit('getAll', {queueId: 'DRIVER'});

socket.on('pickup', (payload) => {
  setTimeout(() => {
    handler(payload);
  },1000);
});

// socket.on('in-transit', (payload) => {
//   setTimeout(() => {
//     socket.emit('delivered', payload);
//   },1000);
// },
// );

// socket.on('delivered', (payload) => {
//   console.log('Driver: I have delivered', payload.orderID);
// },
// );

