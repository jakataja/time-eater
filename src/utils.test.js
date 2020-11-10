import * as utils from './utils';

const mockDate = new Date('2020-10-13T10:20:30Z');
const RealDate = Date;

beforeAll(() => {
  global.Date = jest.fn(() => mockDate);
});

afterAll(() => {
  global.Date = RealDate;
});

describe('dateToString', () => {
  test('should show a formatted date of today', () => {
    expect(utils.dateToString(mockDate)).toStrictEqual('2020-10-13');
  });
});

describe('decimal zero', () => {
  test('should add decimal zero to number smaller than 10', () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 10; i++) {
      expect(utils.z(i)).toEqual(`0${i}`);
    }
  });
});

describe('timeToObject() - change ms to object', () => {
  test('should return object', () => {
    const time = 0;
    expect(utils.timeToObject(time)).toMatchObject(expect.objectContaining({
      h: expect.any(String),
      m: expect.any(String),
      s: expect.any(String),
    }));
  });

  test('should turn to minutes multiple of 60', () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < 60; i++) {
      const time = i * 60;
      const expected = { h: '00', m: utils.z(i), s: '00' };
      expect(utils.timeToObject(time)).toMatchObject(expected);
    }
  });

  test('should turn to hours value above and equal 3600', () => {
    const time1 = 3600;
    const expected1 = { h: utils.z(Math.floor(time1 / 3600)), m: '00', s: '00' };
    expect(utils.timeToObject(time1)).toMatchObject(expected1);

    const time2 = 3601;
    const expected2 = { h: utils.z(Math.floor(time2 / 3600)), m: '00', s: '01' };
    expect(utils.timeToObject(time2)).toMatchObject(expected2);
  });
});

describe('timeToString', () => {
  test('should return string', () => {
    const time = 46;
    expect(utils.timeToString(time)).toEqual(expect.stringContaining('00:00:46'));
  });
});

describe('filterDaysBack', () => {
  const mockTabs = [
    { url: '2020-10-13_www.google.com', time: 0 },
    { url: '2020-10-12_www.gmail.com', time: 0 },
    { url: '2020-10-11_www.facebook.com', time: 0 },
  ];

  test('should throw an error if "from" is smaller than "to"', () => {
    expect(() => utils.filterDaysBack(mockTabs, 0, 1)).toThrowError('Wrong range of days!');
  });

  test('should return array with tabs visited today when from & to are default params', () => {
    const expectedTabs = [
      { url: '2020-10-13_www.google.com', time: 0 },
    ];
    expect(utils.filterDaysBack(mockTabs)).toMatchObject(expectedTabs);
  });

  test('should return array with tabs visited before today when from & to are bigger then 0', () => {
    const expectedTabs = [
      { url: '2020-10-12_www.gmail.com', time: 0 },
      { url: '2020-10-11_www.facebook.com', time: 0 },
    ];
    expect(utils.filterDaysBack(mockTabs, 3, 1)).toMatchObject(expectedTabs);
  });

  test('should return empty array when given from & to are out if a range', () => {
    const expectedTabs = [];
    expect(utils.filterDaysBack(mockTabs, 10, 10)).toEqual(expect.arrayContaining(expectedTabs));
  });
});

describe('sortTime()', () => {
  test('should return number > 0 when b.time is bigger than a.time ', () => {
    const a = { time: 1 };
    const b = { time: 5 };
    expect(utils.sortTime(a, b)).toBe(4);
  });

  test('should return number < 0 when a.time is bigger than b.time ', () => {
    const a = { time: 5 };
    const b = { time: 2 };
    expect(utils.sortTime(a, b)).toBe(-3);
  });
});

describe('sumTime()', () => {
  test('should return sum of time when time is number', () => {
    const a = 1;
    const b = { time: 5 };
    expect(utils.sumTime(a, b)).toBe(6);
  });

  test('should return sum of time when time is string', () => {
    const a = 5;
    const b = { time: '2' };
    expect(utils.sumTime(a, b)).toBe(7);
  });
});
