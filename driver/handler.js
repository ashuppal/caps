'use strict';

const {io} = require('socket.io-client');

const socket = io.connect('http://localhost:3003/caps');

module.exports = (payload) => {
  console.log('Driver: I have picked up', payload.orderID);
  socket.emit('pickup', payload);

  setTimeout(() => {
    console.log('Driver: I am in transit', payload.orderID);
    socket.emit('in-transit', payload);  
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered, ${payload.orderID}`);
    socket.emit('delivered', payload.orderID);
  }, 1000);
  
};


