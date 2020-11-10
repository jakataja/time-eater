import {
  timeToObject, filterDaysBack, timeToString, sumTime, sortTime,
} from '../utils';

export const currTabTimeTotal = (state) => state.currTabTimePrev + state.currTabTime;

export const formatCurrTime = (state) => timeToObject(state.currTabTime);

export const getTodayAll = (state) => {
  const filtered = filterDaysBack(state.allTabs);

  return filtered
    .sort((a, b) => b.time - a.time);
};

export const getTodayAllParsed = (state, getters) => getters.getTodayAll
  .map((item) => item.removeTimeStamp(state.today).timeToString());

export const sumToday = (state, getters) => {
  const filtered = getters.getTodayAll;
  const sum = filtered.reduce(sumTime, 0);
  return timeToString(sum);
};

export const get7DaysAll = (state) => {
  const filtered = filterDaysBack(state.allTabs, 6, 0);
  return filtered
    .sort(sortTime);
};

export const get7DaysAllParsed = (state, getters) => getters.get7DaysAll
  .map((item) => item.removeTimeStamp(state.today).timeToString());

export const sum7Days = (state, getters) => {
  const filtered = getters.get7DaysAll;
  const sum = filtered.reduce(sumTime, 0);
  return timeToString(sum);
};
