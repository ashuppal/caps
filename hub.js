'use strict';

let eventPool = require ('./eventPool.js');

require ('./driver/index.js');
require ('./vendor/index.js');

let Chance = require ('chance');
let chance = new Chance ();

eventPool.on ('pickup', payload => {
  console.log ({
    event: 'pickup',
    time: new Date ().toString(),
    payload: payload,
  });
});

eventPool.on ('in-transit', payload => {
  console.log ({
    event: 'in-transit',
    time: new Date ().toString(),
    payload: payload,
  });
});

eventPool.on ('delivered', payload => {
  console.log ('DRIVER: delivered');
  console.log ('VENDOR: Thank you for delivering my package');
  console.log ({
    event: 'delivered',
    time: new Date ().toString(),
    payload: payload,
  });
});

setInterval (() => {
  console.log('hub js called');
  let companyName = chance.company ();
  eventPool.emit ('VENDOR', companyName);
}, 5000);
