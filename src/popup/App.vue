<template>
  <div id="time-eater-popup">
    <div class="time-eater-tabs">
      <button type="button" class="time-eater-tab is-active">Current</button>
      <button type="button" class="time-eater-tab">Today</button>
      <button type="button" class="time-eater-tab">Week</button>
    </div>
    <div class="time-eater-tab-content">
      <p>Hostname: {{currTab}}</p>
      <p class="clock">{{displayedCurrTime}}</p>
      <p>Total: {{displayedTotalTime}}</p>
<!--      <button @click="startTime">Start</button>-->
<!--      <button @click="stopTime">Stop</button>-->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      timer: null,
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
    }),
    ...mapGetters([
      'currTabTimeTotal',
    ]),
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
    // startTime() {
    //   this.timer = setInterval(() => {
    //     // this.$store.commit('INCREMENT_TIME');
    //     console.log(`${this.currTabTime} / ${this.currTabTime}`);
    //   }, 1000);
    // },
    // stopTime() {
    //   clearInterval(this.timer);
    //   this.saveTime();
    //   this.timer = 0;
    //   this.$store.commit('RESET_TIME');
    //   this.getTime();
    // },

    // getTime() {
    //   console.log('getTime()-------');
    //   const prevTime = Number(localStorage.getItem(`${this.currTab}`)) || 0;
    //
    //   console.log(`get ${this.currTab} : ${prevTime}`);
    //   this.$store.commit('SET_CURR_TAB_PREV_TIME', prevTime);
    // },
    // saveTime() {
    //   localStorage.setItem(`${this.currTab}`, `${this.currTabTimeTotal}`);
    //   console.log(`save ${this.currTab} : ${this.currTabTimeTotal}`);
    // },
  },
  mounted() {
    // this.getUrl();
    // this.startTime();
  },
};
</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
