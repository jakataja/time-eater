<template>
  <div id="time-eater-popup">
    <div class="time-eater-tabs">
      <button type="button" class="time-eater-tab is-active">Current</button>
      <button type="button" class="time-eater-tab">Today</button>
      <button type="button" class="time-eater-tab">Week</button>
    </div>
    <div class="time-eater-tab-content">
      <p>Hostname: {{ currTab }}</p>
      <p class="clock">{{currTabTime}} {{displayedCurrTime}}</p>
      <p>Total: {{displayedTotalTime}}</p>
      <button @click="startTime">Start</button>
      <button @click="stopTime">Stop</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      // timer: null,
    };
  },
  computed: {
    displayedCurrTime() {
      const currTimeObj = this.createTimeObject(this.currTabTime);
      return this.formatTime(currTimeObj);
    },
    displayedTotalTime() {
      const totalTimeObj = this.createTimeObject(this.currTabTimeTotal);
      return this.formatTime(totalTimeObj);
    },
    ...mapState({
      currTab: (state) => state.currTab,
      currTabTime: (state) => state.currTabTime,
      currTabTimeTotal(state) {
        return state.currTabTimePrev + state.currTabTime;
      },
    }),
  },
  methods: {
    createTimeObject(time) {
      const hours = Math.floor(time / 3600);
      const leftTime = time - hours * 3600;
      const minutes = Math.floor(leftTime / 60);
      const seconds = leftTime - minutes * 60;

      return { h: hours, m: minutes, s: seconds };
    },
    formatTime(timeObj) {
      const { h, m, s } = timeObj;
      return `${this.z(h)}:${this.z(m)}:${this.z(s)}`;
    },
    z(number) {
      // put zero before
      return ((number > 9) ? `${number}` : `0${number}`);
    },
    startTime() {
      this.timer = setInterval(() => {
        // this.$store.commit('INCREMENT_TIME');
        console.log(`${this.$store.state.currTabTime} / ${this.currTabTime}`);
      }, 1000);
    },
    stopTime() {
      clearInterval(this.timer);
      this.saveTime();
      this.timer = 0;
      this.$store.commit('RESET_TIME');
      this.getTime();
    },
    // getUrl() {
    //   console.log('getUrl()-------');
    //   chrome.tabs.query({
    //     active: true,
    //     // lastFocusedWindow: true,
    //     currentWindow: true,
    //   }, (tabs) => {
    //     const currentUrl = tabs[0].url;
    //     const { hostname } = new URL(currentUrl);
    //     this.$store.commit('SET_CURR_TAB', hostname);
    //     this.getTime();
    //   });
    // },
    getTime() {
      console.log('getTime()-------');
      const prevTime = Number(localStorage.getItem(this.currTab)) || 0;

      console.log(`get ${this.currTab} : ${prevTime}`);
      this.$store.commit('SET_CURR_TAB_PREV_TIME', prevTime);
    },
    saveTime() {
      localStorage.setItem(this.currTab, this.currTabTimeTotal);
      console.log(`save ${this.currTab} : ${this.currTabTimeTotal}`);
    },
  },
  mounted() {
    console.log('getTime()-------');
    // this.getUrl();
    // this.startTime();
  },
};
</script>

<style lang="scss" scoped>
  #time-eater-popup {
    background-color: #000;
    color: #fff;
    width: 300px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100000;
  }

  .time-eater-tabs {
    display: flex;
    height: 40px;
  }

  .time-eater-tab {
    background-color: #006064;
    border: 0;
    color: #fff;
    flex: 1 1 auto;
  }

  .is-active {
    background-color: #000;
  }

  .time-eater-tab-content {
    padding: 20px;
  }

  .clock {
    font-family: 'ZCOOL QingKe HuangYou', cursive;
    font-size: 36px;
    text-align: center;
  }
</style>
