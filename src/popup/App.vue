<template>
  <div id="time-eater-popup">
    <div class="time-eater-tabs">
      <button v-for="tab in tabComponents"
              :key="tab"
              v-bind:class="[`time-eater-tab`, {'is-active': currTabComponent === tab }]"
              @click="currTabComponent = tab"
              type="button">{{ tab }}</button>
    </div>
    <div class="time-eater-tab-content">
<!--      <p>Hostname: {{currTab}}</p>-->
<!--      <p class="clock">{{displayedCurrTime}}</p>-->
<!--      <p>Total: {{displayedTotalTime}}</p>-->
      <component v-bind:is="currTabComponent"></component>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Current from './Current';
import Today from './Today';
import Week from './Week';

export default {
  data() {
    return {
      // timer: null,
      currTabComponent: 'current',
      tabComponents: ['current', 'today', 'week'],
    };
  },
  components: {
    current: Current,
    today: Today,
    week: Week,
  },
  // computed: {
  //   displayedCurrTime() {
  //     const currTimeObj = this.createTimeObject(this.currTabTime);
  //     return this.formatTime(currTimeObj);
  //   },
  //   displayedTotalTime() {
  //     const totalTimeObj = this.createTimeObject(this.currTabTimeTotal);
  //     return this.formatTime(totalTimeObj);
  //   },
  //   ...mapState({
  //     currTab: (state) => state.currTab,
  //     currTabTime: (state) => state.currTabTime,
  //   }),
  //   ...mapGetters([
  //     'currTabTimeTotal',
  //   ]),
  // },
  // methods: {
  //   createTimeObject(time) {
  //     const hours = Math.floor(time / 3600);
  //     const leftTime = time - hours * 3600;
  //     const minutes = Math.floor(leftTime / 60);
  //     const seconds = leftTime - minutes * 60;
  //
  //     return { h: hours, m: minutes, s: seconds };
  //   },
  //   formatTime(timeObj) {
  //     const { h, m, s } = timeObj;
  //     return `${this.z(h)}:${this.z(m)}:${this.z(s)}`;
  //   },
  //   z(number) {
  //     // put zero before
  //     return ((number > 9) ? `${number}` : `0${number}`);
  //   },
  //   getAll() {
  //     const tabs = [];
  //     // eslint-disable-next-line no-plusplus
  //     for (let i = 0; i < localStorage.length; i++) {
  //       tabs[i] = {
  //         url: localStorage.key(i),
  //         time: localStorage.getItem(localStorage.key(i)),
  //       };
  //     }
  //     this.$store.commit('SET_ALL_TABS', tabs);
  //   },
  // },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
