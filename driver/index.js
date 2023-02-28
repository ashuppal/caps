
'use strict';

const eventPool = require('../eventPool');
const handler = require('./handler');


eventPool.on('pickup', (payload) => {
  console.log('Driver : I have picked up the package');
  setTimeout(() => {
    handler(payload);
  }, 1000);
});



