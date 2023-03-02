'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const eventQueue = new Queue();

const server = new Server();
const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace', socket.id);
  // checkout socket.onAny() to see all events
  socket.onAny((event, payload) => {
    const time = new Date().toISOString();
    console.log({
      event,
      time,
      payload,
    });
  });

  socket.on('JOIN', (room) => {
    console.log('JOIN', room);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    
    let currentQueue = eventQueue.read('DRIVER');
    if(!currentQueue){
      let queueKey = eventQueue.store('DRIVER', new Queue());
      currentQueue= eventQueue.read(queueKey);
    }
    currentQueue.store(payload.orderID, payload);

    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
   
    caps.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    let currentQueue = eventQueue.read(payload.store);
    if(!currentQueue){
      let queueKey = eventQueue.store(payload.store, new Queue());
      currentQueue= eventQueue.read(queueKey);
    }
    currentQueue.store(payload.orderID, payload);    
    caps.emit('delivered', payload);
  });

  socket.on('received', (payload) => {
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if(!currentQueue){
      throw new Error('No queue found for store: ' + payload.store);
    }
    let message = currentQueue.remove(payload.orderID);
    caps.emit('received', message);
  });

  socket.on('getAll', (payload) => {
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach((orderID) => {
        socket.emit('pickup', currentQueue.read(orderID));

      });
    }
  });
});


server.listen(PORT);

server.listen(PORT);
console.log('yo yo');


// caps.on ('connection', socket => {
//   console.log ('connected to caps namespace', socket.id);
//   socket.on ('join', room => {
//     console.log ('joined room', room);
//     socket.join (room);
//   });

  // socket.on ('pickup', payload => {
  //   console.log ('pickup event', payload);
  //   caps.emit ('pickup', payload);
  // });

  // socket.on ('in-transit', payload => {
  //   console.log ('in-transit event', payload);
  //   caps.emit ('in-transit', payload);
  // });

  // socket.on ('delivered', payload => {
  //   console.log ('delivered event', payload);
  //   caps.emit ('delivered', payload);
  // });
  
  // setInterval(() => {
  //   socket.broadcast.emit('VENDOR', chance.company());
  // }, 5000);

  //when the server receives a connection:emit the VENDOR event

// server.on ('connection', socket => {
//   console.log ('####connected to server', socket.id);

// });