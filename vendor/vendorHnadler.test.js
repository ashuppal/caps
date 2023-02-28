'use strict';

const eventPool = require ('../eventPool');
const handler = require ('./handler');
jest.mock ('../eventPool', () => {
  return {
    emit: jest.fn (),
  };
});
console.log = jest.fn ();

describe ('Vendor handler', () => {
  it ('should emit an event', () => {
    const payload = {
      companyName: 'test',
      orderID: '1234',
      customer: 'Ash',
      address: 'Seattle',
    };
    handler (payload);
    expect (eventPool.emit).toHaveBeenCalledWith ('in-transit', payload);
  });
});

