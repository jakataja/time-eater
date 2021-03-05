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
      <component v-bind:is="currTabComponent"></component>
    </div>
  </div>
</template>

<script>

import Current from './Current';
import Today from './Today';
import Week from './Week';

export default {
  data() {
    return {
      currTabComponent: 'current',
      tabComponents: ['current', 'today', 'week'],
    };
  },
  components: {
    current: Current,
    today: Today,
    week: Week,
  },
};
</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
