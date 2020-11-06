import { timeToString } from './utils';

export default class TabObject {
  constructor(url, time) {
    this.url = url;
    this.time = time;
    this.removeTimeStamp = this.removeTimeStamp.bind(this);
    this.timeToString = this.timeToString.bind(this);
  }

  removeTimeStamp(date) {
    const { url } = this;
    this.url = url.substr(-(url.length - date.length - 1));
    return this;
  }

  timeToString() {
    const { time } = this;
    this.time = timeToString(time);
    return this;
  }
}
