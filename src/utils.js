import TabObject from './TabObject';

const DECIMAL_ZERO = '0';

export const dateToString = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const z = (number) => ((number > 9) ? `${number}` : `${DECIMAL_ZERO}${number}`);

export const timeToObject = (time) => ({
  h: z(Math.floor(time / 3600)),
  m: z(Math.floor(time / 60) % 60),
  s: z(time % 60),
});

export const timeToString = (time) => `
  ${z(Math.floor(time / 3600))}:${z(Math.floor(time / 60) % 60)}:${z(time % 60)}
`;

// from - number of days from today back
// to - number of days from today back
// from > to
// eg. (3, 2) - 2 days, 3-2 days from today
// default (0, 0) - today
export const filterDaysBack = (tabsArr, from = 0, to = 0) => {
  // try {
  if (from < to) {
    throw new Error('Wrong range of days!');
  }
  // } catch (err) {
  //   console.log(err.message);
  // }

  const day = new Date();
  const daysBack = [];
  let dayToString;

  // console.log('filterDaysBack', day, from, to);

  // eslint-disable-next-line no-plusplus
  for (let i = to; i <= from; i++) {
    if (i !== 0) day.setDate(day.getDate() - 1);
    // day.setDate((new Date().getDate()) - i);
    // console.log("@ ", day);
    dayToString = `${day.getFullYear()}-${z(day.getMonth() + 1)}-${z(day.getDate())}`;
    daysBack.push(dayToString);
    // day.setDate(day.getDate() - 1);
  }

  // console.log("@ ", daysBack);

  const filtered = tabsArr
    .filter((item) => {
      const d = item.url.split('_')[0];
      return daysBack.includes(d);
    })
    .map((item) => new TabObject(item.url, item.time));

  // console.log("@ filtered", tabsArr, filtered);

  return filtered;
};

export const sortTime = (a, b) => b.time - a.time;
export const sumTime = (a, b) => a + parseInt(b.time, 10);
