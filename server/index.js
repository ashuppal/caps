'use strict';

require ('dotenv').config ();
const {Server} = require ('socket.io');
const PORT = process.env.PORT || 3003;
const Chance = require ('chance');
const chance = new Chance ();

const server = new Server ();

const caps = server.of ('/caps');

caps.on ('connection', socket => {
  console.log ('connected to caps namespace', socket.id);
  socket.on ('join', room => {
    console.log ('joined room', room);
    socket.join (room);
  });

  socket.on ('pickup', payload => {
    console.log ('pickup event', payload);
    caps.emit ('pickup', payload);
  });

  socket.on ('in-transit', payload => {
    console.log ('in-transit event', payload);
    caps.emit ('in-transit', payload);
  });

  socket.on ('delivered', payload => {
    console.log ('delivered event', payload);
    caps.emit ('delivered', payload);
  });
  
  setInterval(() => {
    socket.broadcast.emit('VENDOR', chance.company());
  }, 5000);

});



//when the server receives a connection:emit the VENDOR event

server.on ('connection', socket => {
  console.log ('####connected to server', socket.id);

});

server.listen(PORT);
console.log('yo yo');