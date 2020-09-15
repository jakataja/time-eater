import { parseTime, filterDaysBack } from '../utils';

Array.prototype.removeTimeStamp = function (state) {
  return this.map((item) => ({
    url: item.url.substr(-(item.url.length - state.today.length - 1)),
    time: item.time,
  }));
};

Array.prototype.parseTime = function () {
  return this.map((item) => ({
    url: item.url,
    time: parseTime(item.time),
  }));
};

export const currTabTimeTotal = (state) => state.currTabTimePrev + state.currTabTime;

export const formatCurrTime = (state) => parseTime(state.currTabTime);

export const sortedDesc = (state) => {
  const arr = state.allTabs
    .sort((a, b) => b.time - a.time)
    .parseTime();

  return arr;
};

export const sortedABC = (state) => state.allTabs.sort((a, b) => a.url - b.url);




export const sumAll = (state) => parseTime(state.allTabs.reduce((a, b) => a + parseInt(b.time, 10), 0));

export const sumToday = (state) => {
  const filtered = filterDaysBack(state);
  return parseTime(filtered.reduce((a, b) => a + parseInt(b.time, 10), 0));
};

export const sum7Days = (state) => {
  const filtered = filterDaysBack(state, 7, 1);
  return parseTime(filtered.reduce((a, b) => a + parseInt(b.time, 10), 0));
};


export const getTodayAll = (state) => {
  // const filtered = state.allTabs.filter((item) => item.url.includes(state.today));
  const filtered = filterDaysBack(state);

  return filtered
    .sort((a, b) => b.time - a.time)
    .removeTimeStamp(state)
    .parseTime();
};

export const get7DaysAll = (state) => {
  // const filtered = state.allTabs.filter((item) => item.url.includes(state.today));
  const filtered = filterDaysBack(state, 7, 1);

  return filtered
    .sort((a, b) => b.time - a.time)
    .removeTimeStamp(state)
    .parseTime();
};
