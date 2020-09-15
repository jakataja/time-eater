<template>
  <div>
    <p>You are here already</p>
<!--    <p>{{currTab}}</p>-->
    <p class="clock">
      {{formatCurrTime.h}}<span>h</span>
      {{formatCurrTime.m}}<span>m</span>
      {{formatCurrTime.s}}<span>s</span>
    </p>
<!--    <p>Total: {{displayedTotalTime}}</p>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
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
      'formatCurrTime',
    ]),
  },
  methods: {
    createTimeObject(time) {
      // const leftTime = time - hours * 3600;
      // const minutes = Math.floor(leftTime / 60);
      // const seconds = leftTime - minutes * 60;

      return {
        h: Math.floor(time / 3600),
        m: Math.floor(time / 60) % 60,
        s: time % 60,
      };
    },
    formatTime(timeObj) {
      const { h, m, s } = timeObj;
      // return `${this.z(h)}h ${this.z(m)}min ${this.z(s)}sec`;
      return {
        h: this.z(h),
        m: this.z(m),
        s: this.z(s),
      };
    },
    z(number) {
      // put zero before
      return ((number > 9) ? `${number}` : `0${number}`);
    },
  },
};

</script>

<style lang="scss" scoped>
  @import 'popup';
</style>