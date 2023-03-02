'use strict';

const {io} = require ('socket.io-client');

const socket = io.connect ('http://localhost:3003/caps');

let Chance = require ('chance');
let chance = new Chance ();

const generateOrder =(socket, payload = null)  => {
  if(!payload) {
  const payload = {
    companyName: companyName,
    orderID: chance.guid (),
    customer: chance.name (),
    address: chance.address (),
  };
  };
  console.log ('Vendor: thank you for picking up my package');

  socket.emit ('join', payload.companyName);
  socket.emit ('pickup', payload);
};

const packageDeliver = payload => {
  console.log ('Vendor: Thank you for delivering', payload.orderID);
}

