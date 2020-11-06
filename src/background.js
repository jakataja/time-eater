import store from './store';
import { z } from './utils';
import TabObject from './TabObject';


window.store = store;

// alert(`Hello ${store.getters.foo}!`);

let timer;

export const getToday = () => {
  const date = new Date();
  console.log(date);
  return `${date.getFullYear()}-${z(date.getMonth() + 1)}-${z(date.getDate())}`;
};

export const clearTimer = () => {
  store.commit('RESET_TIME');
  clearInterval(timer);
};

export const saveTime = () => {
  if (store.state.currTab === '') return;
  localStorage.setItem(`${store.state.currTab}`, `${store.getters.currTabTimeTotal}`);
  // console.log(`save ${store.state.currTab} : ${store.getters.currTabTimeTotal}`);
  clearTimer();
};

export const startTimer = () => {
  timer = setInterval(() => {
    store.commit('INCREMENT_TIME');
    // console.log(`time ${store.state.currTabTime}/${store.getters.currTabTimeTotal}`);
  }, 1000);
};

export const getTime = () => {
  // console.log(`getTime(${store.state.currTab})-------`);
  const prevTime = Number(localStorage.getItem(`${store.state.currTab}`)) || 0;
  // console.log(`get ${store.state.currTab} : ${prevTime}`);
  store.commit('SET_CURR_TAB_PREV_TIME', prevTime);
};

export const getAll = () => {
  const tabs = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < localStorage.length; i++) {
    tabs[i] = new TabObject(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
  }

  store.commit('SET_ALL_TABS', tabs);
};

export const onGetTab = (tab) => {
  const { url } = tab;
  const { hostname } = new URL(url);

  if (hostname === store.state.currTab) {
    return;
  }

  saveTime();
  store.commit('SET_CURR_TAB', hostname);
  // console.log(`onGetTab ${hostname}`);
  getTime();
  startTimer();
};


export const getUrl = (id) => {
  // console.log(`getUrl(${id})`);

  if (id) {
    // activated
    chrome.tabs.get(id, (tab) => {
      onGetTab(tab);
    });
  } else {
    // initial
    chrome.tabs.query({
      active: true,
      // lastFocusedWindow: true,
      currentWindow: true,
    }, (tabs) => {
      onGetTab(tabs[0]);
    });
  }
};
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log(request);
//   console.log(sender);
// });

export const init = (id) => {
  const today = getToday();
  console.log('today', today, store.getters.today);
  if (store.getters.today !== today) {
    store.commit('SET_TODAY', today);
  }
  getUrl(id);
  getAll();
};

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
  console.log(`activated tab ${tabId} / ${windowId}`);
  // chrome.runtime.sendMessage({ greeting: 'hello'}, (response) => {
  //     console.log(response.farewell);
  // });

  init(tabId);
});

init();

