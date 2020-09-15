<template>
  <ul class="te-list">
    <li class="te-list-item">
      <span class="te-list-url">ALL</span>
      <span class="te-list-separator"></span>
      <span class="te-list-time">
        {{$store.getters.sumToday.h}}:{{$store.getters.sumToday.m}}:{{$store.getters.sumToday.s}}
      </span>
    </li>
    <li class="te-list-item" v-for="item in $store.getters.getTodayAll" :key="item.url" >
      <span class="te-list-url">{{item.url}}</span>
      <span class="te-list-separator"></span>
      <span class="te-list-time">{{ item.time.h }}:{{ item.time.m }}:{{ item.time.s }}</span>
    </li>
  </ul>
</template>

<script>
// import { mapState, mapGetters } from 'vuex';
import tabObject from '../utils';

export default {
  data() {
    return {

    };
  },
  computed: {
    rankList() {

    },
  },
  methods: {
    getAll() {
      const tabs = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < localStorage.length; i++) {
        // tabs[i] = {
        //   url: localStorage.key(i),
        //   time: localStorage.getItem(localStorage.key(i)),
        // };
        tabs[i] = new tabObject(localStorage.key(i), localStorage.getItem(localStorage.key(i));
      }
      this.$store.commit('SET_ALL_TABS', tabs);
    },
  },
  mounted() {
    this.getAll();
  },
};

</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
