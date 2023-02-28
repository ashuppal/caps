'use strict';

const eventPool = require('../eventPool');

var Chance = require('chance');
var chance = new Chance();

module.exports = (companyName) => {
  
  const payload = {
    companyName: companyName,
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log('Vendor: thank you for picking up my package');
  eventPool.emit('pickup', payload);

};