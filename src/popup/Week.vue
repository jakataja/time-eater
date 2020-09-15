<template>
  <ul class="te-list">
    <li class="te-list-item">
      <span class="te-list-url">ALL</span>
      <span class="te-list-separator"></span>
      <span class="te-list-time">{{$store.getters.sum7Days.h}}:{{$store.getters.sum7Days.m}}:{{$store.getters.sum7Days.s}}</span>
    </li>
    <li class="te-list-item" v-for="item in $store.getters.get7DaysAll" :key="item.url" >
      <span class="te-list-url">{{item.url}}</span>
      <span class="te-list-separator"></span>
      <span class="te-list-time">{{ item.time.h }}:{{ item.time.m }}:{{ item.time.s }}</span>
    </li>
  </ul>
</template>

<script>
  // import { mapState, mapGetters } from 'vuex';

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
    },
    mounted() {
    },
  };

</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
