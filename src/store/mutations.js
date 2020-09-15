import * as types from './mutation-types';

export default {
  [types.SET_CURR_TAB](state, currTab) {
    state.currTab = `${state.today}_${currTab}`;
    console.log(`SET_CURR_TAB ${state.today}_${currTab}`);
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
  [types.SET_ALL_TABS](state, tabs) {
    state.allTabs = tabs;
    console.log(`SET_ALL_TABS ${state.allTabs}`);
  },
  [types.SET_TODAY](state, today) {
    state.today = today;
    console.log(`SET_TODAY ${state.today}`);
  },
};
