'use strict';

const socket = require ('../../socket');
// const eventPool = require ('../eventPool');
const handler = require ('./handler');

const { packageDelivered, generateOrder } = require('./handler');

jest.mock('../socket.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
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
    expect (socket.emit).toHaveBeenCalledWith ('in-transit', payload);
  });
});
