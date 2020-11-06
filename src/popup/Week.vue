<template>
  <ul class="te-list">
    <li class="te-list-item">
      <span class="te-list-url">ALL</span>
      <span class="te-list-separator"></span>
      <span class="te-list-time">{{ sum7Days }}</span>
    </li>
    <li class="te-list-item" v-for="item in get7DaysAllParsed" :key="item.url" >
      <span class="te-list-url">{{item.url}}</span>
      <span class="te-list-separator"></span>
      <span class="te-list-time">{{ item.time }}</span>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'sum7Days',
      'get7DaysAllParsed',
    ]),
  },
};

</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
