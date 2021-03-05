<template>
  <ul class="te-list">
    <li class="te-list-item">
      <span class="te-list-url">ALL</span>
      <span class="te-list-separator"></span>
      <span class="te-list-time">{{ sumToday }}</span>
    </li>
    <li class="te-list-item" v-for="item in getTodayAllParsed" :key="item.url" >
      <span class="te-list-url">{{ item.url }}</span>
      <span class="te-list-separator"></span>
      <span class="te-list-time">{{ item.time }} </span>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapActions([
      'setAllTabs',
    ]),
    ...mapGetters([
      'sumToday',
      'getTodayAllParsed',
    ]),
  },
};

</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
