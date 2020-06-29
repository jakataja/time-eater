import * as types from './mutation-types';

export default {
  [types.UPDATE_FOO](state, payload) {
    state.foo = payload;
  },
  [types.SET_CURR_TAB](state, currTab) {
    state.currTab = currTab;
  },
  [types.INCREMENT_TIME](state) {
    state.currTabTime += 1;
  },
  [types.SET_CURR_TAB_PREV_TIME](state, time) {
    state.currTabTimePrev = time;
  },
  [types.RESET_TIME](state) {
    state.currTabTime = 0;
  },
};
