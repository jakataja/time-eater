const DECIMAL_ZERO = '0';

export const dateToString = (date) => `${date.getFullYear()}-${date.getMonth() + 1} - ${date.getDate() - 1}`;

export const z = (number) => ((number > 9) ? `${number}` : `${DECIMAL_ZERO}${number}`);

export const parseTime = (time) => ({
  h: z(Math.floor(time / 3600)),
  m: z(Math.floor(time / 60) % 60),
  s: z(time % 60),
});

// from - number of days from today back
// to - number of days from today back
// from > to
// eg. (3, 2) - 2 days, 3-2 days from today
// default (0, 0) - today
export const filterDaysBack = (tabsArr, from = 0, to = 0) => {
  if (from < to) {
    throw 'Wrong range of days!';
  }

  const day = new Date();
  const daysBack = [];
  let dayToString;

  // eslint-disable-next-line no-plusplus
  for (let i = to; i <= from; i++) {
    day.setDate(new Date().getDate() - i);
    dayToString = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
    daysBack.push(dayToString);
  }

  return tabsArr.filter((item) => {
    const d = item.url.split('_')[0];
    return daysBack.includes(d);
  });
};

export default class tabObject {
  constructor(url, time) {
    this.url = url;
    this.time = time;
  }
}
