import {
  timeToObject, filterDaysBack, timeToString, sumTime, sortTime
} from '../utils';

// Array.prototype.removeTimeStamp = function (state) {
//   return this.map((item) => ({
//     ...item,
//     url: item.url.substr(-(item.url.length - state.today.length - 1)),
//   }));
// };
//
// Array.prototype.timeToObject = function () {
//   return this.map((item) => ({
//     // url: item.url,
//     // time: timeToObject(item.time),
//     ...item,
//     time: timeToObject(item.time),
//   }));
// };

export const currTabTimeTotal = (state) => state.currTabTimePrev + state.currTabTime;

export const formatCurrTime = (state) => timeToObject(state.currTabTime);

// export const sortedDesc = (state) => {
//   const arr = state.allTabs
//     .sort((a, b) => b.time - a.time)
//     .timeToObject();
//
//   return arr;
// };

// export const sortedABC = (state) => state.allTabs
//   .sort((a, b) => ((a.url > b.url) ? 1 : ((b.url > a.url) ? -1 : 0)))
//   .reverse();

// export const sumAll = (state) => timeToObject(state.allTabs.reduce((a, b) => a + parseInt(b.time, 10), 0));

export const getTodayAll = (state) => {
  const filtered = filterDaysBack(state.allTabs);

  return filtered
    .sort((a, b) => b.time - a.time);
  // .removeTimeStamp(state)
  // .timeToObject();
  // .map((item) => item.removeTimeStamp(state.today).timeToString());
};

export const getTodayAllParsed = (state, getters) => getters.getTodayAll
  // .sort(sortTime)
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
  // .sort((a, b) => b.time - a.time)
  .map((item) => item.removeTimeStamp(state.today).timeToString());

export const sum7Days = (state, getters) => {
  const filtered = getters.get7DaysAll;
  const sum = filtered.reduce(sumTime, 0);
  return timeToString(sum);
};
