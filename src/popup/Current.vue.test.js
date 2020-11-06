import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Current from './Current';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Current.vue', () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      formatCurrTime: () => ({ h: '1', m: '20', s: '05' }),
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it('Renders "store.getters.formatCurrTime" in p tag', () => {
    const wrapper = shallowMount(Current, { store, localVue });
    const p = wrapper.find('p.clock');
    expect(p.text()).toContain('1h');
    expect(p.text()).toContain('20m');
    expect(p.text()).toContain('05s');
  });
});
