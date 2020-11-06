import * as getters from './getters';

const mockDate = new Date('2020-11-03T10:20:30Z');
const RealDate = Date;

// beforeAll(() => {
//   global.Date = jest.fn(() => mockDate);
// });
//
// afterAll(() => {
//   global.Date = RealDate;
// });


describe('getters', () => {
  let state;

  beforeEach(() => {
    // global.Date = jest.fn(() => mockDate);
    state = {
      foo: 'bar',
      currTab: 'www.google.com',
      currTabTime: 4221,
      currTabTimePrev: 98129,
      allTabs: [
        { url: '2020-11-03_www.google.com', time: '98129' },
        { url: '2020-11-03_www.github.com', time: '45732' },
        { url: '2020-10-28_www.gmail.com', time: '232' },
        { url: '2020-10-25_vue-test-utils.vuejs.org', time: '765' },
      ],
      today: '2020-11-03',
    };
  });

  afterEach(() => {
    // global.Date = RealDate;
  });

  it('"currTabTimeTotal" returns time spent in active Tab that was visited before', () => {
    expect(getters.currTabTimeTotal(state)).toBe(state.currTabTimePrev + state.currTabTime);
  });

  it('"currTabTimeTotal" returns time spent in active Tab that was visited for the first time', () => {
    state.currTabTimePrev = 0;
    expect(getters.currTabTimeTotal(state)).toBe(state.currTabTime);
  });

  it('"formatCurrTime" returns formatted time spent in active Tab', () => {
    expect(getters.formatCurrTime(state)).toStrictEqual({ h: '01', m: '10', s: '21' });
  });

  it('"getTodayAll" returns all visited tabs today', () => {
    global.Date = jest.fn(() => mockDate);
    expect(getters.getTodayAll(state)).toMatchObject([
      { url: '2020-11-03_www.google.com', time: '98129' },
      { url: '2020-11-03_www.github.com', time: '45732' },
    ]);
    global.Date = RealDate;
  });

  it('"sumToday" returns parsed total time spent in all tabs today', () => {
    global.Date = jest.fn(() => mockDate);
    const getTodayAll = [];
    getTodayAll.reduce = jest.fn(() => 143861);
    expect(getters.sumToday(state, { getTodayAll })).toContain('39:57:41');
    global.Date = RealDate;
  });

  it('"getTodayAllParsed" returns all visited tabs today', () => {
    global.Date = jest.fn(() => mockDate);
    const getTodayAll = [
      { url: 'www.google.com', time: { h: '27', m: '15', s: '29' } },
      { url: 'www.github.com', time: { h: '12', m: '42', s: '12' } },
    ];
    getTodayAll.map = jest.fn(() => [
      { url: 'www.google.com', time: '27:15:29' },
      { url: 'www.github.com', time: '12:42:12' },
    ]);
    expect(getters.getTodayAllParsed(state, { getTodayAll })).toMatchObject([
      { url: 'www.google.com', time: '27:15:29' },
      { url: 'www.github.com', time: '12:42:12' },
    ]);
    global.Date = RealDate;
  });

  it('"get7DaysAll " returns returns all visited tabs for last 7 days', () => {
    global.Date = jest.fn(() => mockDate);
    expect(getters.get7DaysAll(state)).toMatchObject([
      { url: '2020-11-03_www.google.com', time: '98129' },
      { url: '2020-11-03_www.github.com', time: '45732' },
      { url: '2020-10-28_www.gmail.com', time: '232' },
    ]);
    global.Date = RealDate;
  });

  it('"sum7Days" returns parsed total time spent in all tabs for last 7 days', () => {
    global.Date = jest.fn(() => mockDate);
    const get7DaysAll = [];
    get7DaysAll.reduce = jest.fn(() => 144093);
    expect(getters.sum7Days(state, { get7DaysAll })).toContain('40:01:33');
    global.Date = RealDate;
  });

  it('"get7DaysAllParsed " returns returns all visited tabs for last 7 days', () => {
    global.Date = jest.fn(() => mockDate);
    const get7DaysAll = [
      { url: '2020-11-03_www.google.com', time: '98129' },
      { url: '2020-11-03_www.github.com', time: '45732' },
      { url: '2020-10-28_www.gmail.com', time: '232' },
    ];
    get7DaysAll.map = jest.fn(() => [
      { url: 'www.google.com', time: '27:15:29' },
      { url: 'www.github.com', time: '12:42:12' },
      { url: 'www.gmail.com', time: '00:03:52' },
    ]);
    expect(getters.get7DaysAllParsed(state, { get7DaysAll })).toMatchObject([
      { url: 'www.google.com', time: '27:15:29' },
      { url: 'www.github.com', time: '12:42:12' },
      { url: 'www.gmail.com', time: '00:03:52' },
    ]);
    global.Date = RealDate;
  });
});
