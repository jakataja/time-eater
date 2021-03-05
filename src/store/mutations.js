import * as types from './mutation-types';

export default {
  [types.SET_CURR_TAB](state, currTab) {
    state.currTab = `${state.today}_${currTab}`;
  },
  [types.INCREMENT_TIME](state) {
    state.currTabTime += 1;
  },
  [types.SET_CURR_TAB_PREV_TIME](state, time) {
    state.currTabTimePrev = time;
  },
  [types.RESET_TIME](state) {
    state.currTabTime = 0;
    state.currTabTimePrev = 0;
  },
  [types.SET_ALL_TABS](state, tabs) {
    state.allTabs = tabs;
  },
  [types.SET_TODAY](state, today) {
    state.today = today;
  },
};
