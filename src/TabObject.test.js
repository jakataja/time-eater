import TabObject from './TabObject';

let someTab;

beforeEach(() => {
  someTab = new TabObject('2020-11-06_www.google.com', 95);
});

describe('TabObject', () => {
  it('initialize tab object', () => {
    expect(someTab.url).toBe('2020-11-06_www.google.com');
    expect(someTab.time).toBe(95);
  });

  it('removeTimeStamp() should remove date from url ', () => {
    const date1 = '2020-11-06';
    expect(someTab.removeTimeStamp(date1).url).toBe('www.google.com');
  });

  it('removeTimeStamp() should not change time ', () => {
    const date1 = '2020-11-06';
    expect(someTab.removeTimeStamp(date1).time).toBe(95);
  });

  it('timeToString() should return time as a parsed string ', () => {
    expect(someTab.timeToString().time).toContain('00:01:35');
  });

  it('timeToString() should not change url ', () => {
    expect(someTab.timeToString().url).toBe('2020-11-06_www.google.com');
  });
});
