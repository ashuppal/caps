'use strict';

const {io} = require ('socket.io-client');

const socket = io.connect ('http://localhost:3003/caps');

let Chance = require ('chance');
let chance = new Chance ();

module.exports = companyName => {
  const payload = {
    companyName: companyName,
    orderID: chance.guid (),
    customer: chance.name (),
    address: chance.address (),
  };
  console.log ('Vendor: thank you for picking up my package');
  socket.emit ('pickup', payload);
};
