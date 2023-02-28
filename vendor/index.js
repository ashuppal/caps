'use strict';

const eventPool = require('../eventPool');
const handler = require('./handler');

eventPool.on('VENDOR', (companyName) => {
  setTimeout(() => {
    handler(companyName);
  }, 1000);
});