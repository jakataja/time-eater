import Vue from 'vue';
import Bar from './Bar';
import store from '../store';

const pagePopup = document.createElement('div');
pagePopup.id = 'vwe-bar';
document.body.prepend(pagePopup);

console.log('extension', pagePopup);
// eslint-disable-next-line no-new
new Vue({
  el: '#vwe-bar',
  store,
  render: (h) => h(Bar),
});
