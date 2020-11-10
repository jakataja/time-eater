import Vue from 'vue';
import App from './App';
import store from '../store';

/* eslint-disable no-new */
new Vue({
  el: '#popup',
  store,
  render: (h) => h(App),
});
