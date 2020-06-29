import Vue from 'vue';
import App from './App';
import store from '../store';

// const pageBody = document.body.firstChild;
// const pagePopup = document.createElement('div');
// document.body.insertBefore(pagePopup, pageBody);

/* eslint-disable no-new */
new Vue({
  el: '#popup',
  // el: pagePopup,
  store,
  render: (h) => h(App),
});
