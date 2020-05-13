<template>
  <div id="time-eater-popup">
    <p>Time: {{displayedTime}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currTime: 0,
      timer: null,
    };
  },
  computed: {
    displayedTime() {
      const hours = Math.floor(this.currTime / 3600);
      const leftTime = this.currTime - hours * 3600;
      const minutes = Math.floor(leftTime / 60);
      const seconds = leftTime - minutes * 60;

      return this.formatTime(hours, minutes, seconds);
    },
  },
  methods: {
    formatTime(h, m, s) {
      const args = [h, m, s];
      const formatted = args.map((number) => ((number > 9) ? number : `0${number}`));
      return formatted.join(':');
    },
    startTime() {
      this.timer = setInterval(() => {
        this.currTime++;
      }, 1000);
    },
    stopTime() {
      clearInterval(this.timer);
      this.timer = 0;
    },
  },
  mounted() {
    // this.startTime();
  },
};
</script>

<style lang="scss" scoped>
  @import 'content';
</style>
