<template>
  <div id="time-eater-popup">
    <p>{{currTime}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currTime: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
