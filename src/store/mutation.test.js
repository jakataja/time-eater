import mutations from './mutations';

describe('mutation', () => {
  let state;

  beforeEach(() => {
    state = {
      foo: 'bar',
      currTab: '',
      currTabTime: 2,
      currTabTimePrev: 0,
      allTabs: [],
      today: '03.11.2020',
    };
  });

  it('SET_CURR_TAB set "state.currTab"', () => {
    mutations.SET_CURR_TAB(state, 'www.google.pl');
    expect(state.currTab).toBe('03.11.2020_www.google.pl');
  });

  it('INCREMENT_TIME increment "state.currTabTime" by 1', () => {
    mutations.INCREMENT_TIME(state);
    expect(state.currTabTime).toBe(3);
  });

  it('SET_CURR_TAB_PREV_TIME set "state.currTabTimePrev"', () => {
    mutations.SET_CURR_TAB_PREV_TIME(state, 2343);
    expect(state.currTabTimePrev).toBe(2343);
  });

  it('RESET_TIME set "state.currTabTime" and "state.currTabTimePrev" to be 0', () => {
    mutations.RESET_TIME(state);
    expect(state.currTabTime).toBe(0);
    expect(state.currTabTimePrev).toBe(0);
  });

  it('SET_ALL_TABS set "state.allTabs"', () => {
    const tabs = [
      { url: 'www.google.pl', time: '98129' },
      { url: 'www.github.com', time: '45732' },
      { url: 'www.gmail.com', time: '232' },
      { url: 'vue-test-utils.vuejs.org/', time: '765' },
    ];
    mutations.SET_ALL_TABS(state, tabs);
    expect(state.allTabs).toBe(tabs);
  });

  it('SET_TODAY set "state.today" ', () => {
    mutations.SET_TODAY(state, '04.11.2020');
    expect(state.today).toBe('04.11.2020');
  });
});
