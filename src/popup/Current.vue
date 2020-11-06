<template>
  <div>
    <p>You are here already</p>
    <p class="clock">
      {{formatCurrTime.h}}<span>h</span>
      {{formatCurrTime.m}}<span>m</span>
      {{formatCurrTime.s}}<span>s</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'formatCurrTime',
    ]),
  },
  methods: {},
};

</script>

<style lang="scss" scoped>
  @import 'popup';
</style>
