import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Week from './Week';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Week.vue', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      sum7Days: () => '09:54:15',
      get7DaysAllParsed: () => ([
        { url: 'www.google.pl', time: '01:14:59' },
        { url: 'www.github.com', time: '03:33:10' },
        { url: 'www.gmail.com', time: '04:07:06' },
      ]),
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('Renders "ALL" in first span with class "te-list-url"', () => {
    const wrapper = shallowMount(Week, { store, localVue });
    const span = wrapper.find('span.te-list-url');
    expect(span.text()).toBe('ALL');
  });

  it('Renders "store.getters.sumToday" on first position', () => {
    const wrapper = shallowMount(Week, { store, localVue });
    const span = wrapper.find('span.te-list-time');
    expect(span.text()).toContain(':');
    expect(span.text()).toContain('09');
    expect(span.text()).toContain('54');
    expect(span.text()).toContain('15');
  });

  it('Renders list with 4 positions', () => {
    const wrapper = shallowMount(Week, { store, localVue });
    const spanAll = wrapper.findAll('span.te-list-time');
    expect(spanAll).toHaveLength(4);
  });
});
