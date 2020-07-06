import * as types from './mutation-types';

export default {
  [types.SET_CURR_TAB](state, currTab) {
    state.currTab = currTab;
    console.log(`SET_CURR_TAB ${state.currTab}`);
  },
  [types.INCREMENT_TIME](state) {
    state.currTabTime += 1;
    console.log(state.currTabTime);
  },
  [types.SET_CURR_TAB_PREV_TIME](state, time) {
    state.currTabTimePrev = time;
  },
  [types.RESET_TIME](state) {
    state.currTabTime = 0;
    state.currTabTimePrev = 0;
    console.log(`RESET_TIME ${state.currTabTime} ${state.currTabTimePrev}`);
  },
};
