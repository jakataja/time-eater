import * as background from './background';

describe('getToday', () => {
  it('should return date of today', () => {
    const mockDate = new Date('2020-10-07T10:20:30Z');
    expect(background.getToday()).toStrictEqual('2020-10-7');
  });
});
