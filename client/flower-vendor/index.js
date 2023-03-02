'use strict';

const {io} = require('socket.io-client');

const socket = io.connect('http://localhost:3003/caps');

const{packageDeliver} = require('./handler');

socket.emit('getAll', {store: '1800-flowers'});

socket.on('delivered', (payload) => {
  packageDeliver(payload);
  socket.emit('received', payload);
});
