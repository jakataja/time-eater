import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Today from './Today';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Today.vue', () => {
  let getters;
  let store;
  let actions;

  beforeEach(() => {
    getters = {
      sumToday: () => '09:54:15',
      getTodayAllParsed: () => ([
        { url: 'www.google.pl', time: '01:14:59' },
        { url: 'www.github.com', time: '03:33:10' },
        { url: 'www.gmail.com', time: '04:07:06' },
      ]),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });

  });

  it('Renders "ALL" in first span with class "te-list-url"', () => {
    const wrapper = shallowMount(Today, { store, localVue });
    const span = wrapper.find('span.te-list-url');
    expect(span.text()).toBe('ALL');
  });

  it('Renders "store.getters.sumToday" on first position', () => {
    const wrapper = shallowMount(Today, { store, localVue });
    const span = wrapper.find('span.te-list-time');
    expect(span.text()).toStrictEqual('09:54:15');
  });

  it('Renders list with 4 positions', () => {
    const wrapper = shallowMount(Today, { store, localVue });
    const spanAll = wrapper.findAll('span.te-list-time');
    expect(spanAll).toHaveLength(4);
  });
});
