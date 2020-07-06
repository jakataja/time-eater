import store from './store';

window.store = store;

alert(`Hello ${store.getters.foo}!`);

let timer;

const clearTimer = () => {
  store.commit('RESET_TIME');
  clearInterval(timer);
};

const saveTime = () => {
  localStorage.setItem(`${store.state.currTab}`, `${store.getters.currTabTimeTotal}`);
  console.log(`save ${store.state.currTab} : ${store.getters.currTabTimeTotal}`);
  clearTimer();
};

const startTimer = () => {
  timer = setInterval(() => {
    store.commit('INCREMENT_TIME');
      console.log(`time ${store.state.currTabTime}/${store.getters.currTabTimeTotal}`);
  }, 1000);
  // console.log(`time ${store.state.currTabTime}/${store.getters.currTabTimeTotal}`);
};

const getTime = () => {
  console.log(`getTime(${store.state.currTab})-------`);
  const prevTime = Number(localStorage.getItem(`${store.state.currTab}`)) || 0;

  console.log(`get ${store.state.currTab} : ${prevTime}`);
  store.commit('SET_CURR_TAB_PREV_TIME', prevTime);

  startTimer();
};

const getUrl = (id) => {
  console.log('getUrl()-------');
  chrome.tabs.get(id, (tab) => {
    console.log(`tab ${tab.url}`);
    const currentUrl = tab.url;
    const { hostname } = new URL(currentUrl);
    if (hostname === store.state.currTab) {
      console.log('same domain');
      return;
    }

    saveTime();
    store.commit('SET_CURR_TAB', hostname);
    console.log(hostname);

    getTime();
  });
};
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log(request);
//   console.log(sender);
// });

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
  console.log(`activated tab ${tabId} / ${windowId}`);
  // chrome.runtime.sendMessage({ greeting: 'hello'}, (response) => {
  //     console.log(response.farewell);
  // });

  getUrl(tabId);
});
