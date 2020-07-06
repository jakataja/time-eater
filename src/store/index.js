import Vue from 'vue';
import Vuex from 'vuex';

import VuexChromePlugin from 'vuex-chrome-plugin';
import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foo: 'bar',
    currTab: '',
    currTabTime: 0,
    currTabTimePrev: 0,
  },
  getters,
  mutations,
  actions,
  plugins: [
    VuexChromePlugin(),
  ],
});
