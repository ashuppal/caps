'use strict';

const eventPool = require('../eventPool');


module.exports = (payload) => {
  console.log(`DRIVER: received, ${payload.event}`);
  eventPool.emit('in-transit', payload);

  setTimeout(() => {
    console.log(`DRIVER: delivered, ${payload.event}`);
    eventPool.emit('delivered', payload);
  }, 1000);
  
};
