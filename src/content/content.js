// import Vue from 'vue';
// import App from './App';
// import store from '../store';
//
// const pageBody = document.body.firstChild;
// const pagePopup = document.createElement('div');
// document.body.insertBefore(pagePopup, pageBody);
//
// console.log('extension');
// // eslint-disable-next-line no-new
// new Vue({
//   el: pagePopup,
//   // el: '#app',
//   store,
//
//   render: (h) => h(App),
// });

chrome.tabs.onActivated.addListener(({ tabId, windowId}) => {
  console.log(`activated tab ${tabId} / ${windowId}`);
});
