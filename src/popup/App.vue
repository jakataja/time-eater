<template>
  <div id="time-eater-popup">
    <div class="time-eater-tabs">
      <button type="button" class="time-eater-tab is-active">Current</button>
      <button type="button" class="time-eater-tab">Today</button>
      <button type="button" class="time-eater-tab">Week</button>
    </div>
    <div class="time-eater-tab-content">
      <p>Hostname: {{hostname}}</p>
      <p class="clock">{{displayedCurrTime}}</p>
      <p>Total: {{displayedTotalTime}}</p>
      <button v-on:click="startTime">Start</button>
      <button v-on:click="stopTime">Stop</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currTime: 0,
      prevTime: 0,
      // totalTime: 0,
      timer: null,
      currentUrl: '',
      hostname: '',
    };
  },
  computed: {
    displayedCurrTime() {
      const currTimeObj = this.createTimeObject(this.currTime);
      return this.formatTime(currTimeObj);
    },
    displayedTotalTime() {
      const totalTimeObj = this.createTimeObject(this.totalTime);
      return this.formatTime(totalTimeObj);
    },
    totalTime() {
      // this.totalTime = this.prevTime + this.currTime;
      return this.prevTime + this.currTime;
    },
  },
  methods: {
    createTimeObject(time) {
      const hours = Math.floor(time / 3600);
      const leftTime = time - hours * 3600;
      const minutes = Math.floor(leftTime / 60);
      const seconds = leftTime - minutes * 60;

      return { h: hours, m: minutes, s: seconds };
    },
    formatTime({ h, m, s }) {
      return `${this.z(h)}:${this.z(m)}:${this.z(s)}`;
    },
    z(number) {
      // put zero before
      return ((number > 9) ? `${number}` : `0${number}`);
    },
    startTime() {
      this.timer = setInterval(() => {
        this.currTime += 1;
      }, 1000);
    },
    stopTime() {
      clearInterval(this.timer);
      console.log(`T: ${this.totalTime} + C: ${this.currTime} `);

      this.saveTime();
      this.timer = 0;
      this.currTime = 0;
      this.getTime();
    },
    getUrl() {
      console.log('getUrl()-------');
      chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
        // currentWindow: true,
      }, (tabs) => {
        // and use that tab to fill in out title and url
        this.currentUrl = tabs[0].url;
        this.hostname = new URL(this.currentUrl).hostname;
        console.log(this.currentUrl);
        console.log(this.hostname);
        // alert(tab.url);
        this.getTime();
      });
    },
    getTime() {
      console.log('getTime()-------');
      // chrome.storage.local.get((this.hostname), (result) => {
      //   console.log(result);
      //   this.prevTime = result[this.hostname] || 0;
      //   console.log(`get ${this.hostname} : ${this.prevTime}`);
      // });

      this.prevTime = localStorage.getItem(this.hostname) || 0;
      console.log(`get ${this.hostname} : ${this.prevTime}`);
    },
    saveTime() {
      // const timeObject = {};
      // timeObject[this.hostname] = this.totalTime;
      // chrome.storage.local.set(timeObject, () => {
      //   console.log(`save ${this.hostname} : ${this.totalTime}`);
      // });

      localStorage.setItem(this.hostname, this.totalTime);
      console.log(`save ${this.hostname} : ${this.totalTime}`);
    },
  },
  mounted() {
    this.getUrl();
    // this.getTime();
    this.startTime();
  },
};
</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
