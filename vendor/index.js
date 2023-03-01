'use strict';

const handler = require ('./handler');

const {io} = require ('socket.io-client');

const socket = io.connect ('http://localhost:3003/caps');


socket.on('VENDOR', (companyName) => {
  setTimeout(() => {
    handler(companyName);
  }, 1000);
});





// socket.on ('VENDOR', companyName => {
//   const payload = {
//     companyName: companyName,
//     orderID: chance.guid (),
//     customer: chance.name (),
//     address: chance.address (),
//   };
//   console.log ('Vendor: thank you for picking up my package');
//   socket.emit ('pickup', payload);
// });

// socket.on ('delivered', payload => {
//   console.log ('Vendor: Thank you for delivering', payload.orderID);
// });
