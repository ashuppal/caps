'use strict';

let Chance = require('chance');
let chance = new Chance();

const generateOrder = (socket,payload = null) => {
  if(!payload){
    payload = {
      store: '1-800-flowers',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  socket.emit('join', payload.store);
  console.log('vendor: order ready for pickup');
  socket.emit('pickup', payload);

};

const packageDeliver = (payload) => {
  console.log('vendor: Thank you, package delivered', payload.orderID);
};

module.exports = {generateOrder, packageDeliver};
