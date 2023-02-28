'use strict';

const eventPool = require('../eventPool');
const handler = require('./handler');

eventPool.emit = jest.fn();

describe('driver handler', () => {
  it('should emit an event', () => {
    const payload = { event: 'test' };
    handler(payload);
    expect(eventPool.emit).toHaveBeenCalledWith( 'in-transit', payload);
  });
});
