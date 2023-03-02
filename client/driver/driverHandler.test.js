'use strict';

const eventPool = require ('../../eventPool');
const handler = require ('./handler');
jest.mock ('../eventPool', () => {
  return {
    emit: jest.fn (),
  };
});
console.log = jest.fn ();

describe('pickup event ', () => {
  
  it('should emit an event', () => {
    const payload = {
      event: 'pickup',
      time: new Date(),
      payload: {
        store: '1-206-flowers',
        orderID: '1234',
        customer: 'Ash',
        address: 'Seattle',
      },
    };
    handler(payload);
    expect(eventPool.emit).toHaveBeenCalledWith('in-transit', payload);
  });
});



// describe('driver handler', () => {
//   it('should emit an event', () => {
//     const payload = { event: 'test' };
//     handler(payload);
//     expect(eventPool.emit).toHaveBeenCalledWith( 'in-transit', payload);
//   });
// });
