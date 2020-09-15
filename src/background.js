import store from './store';

window.store = store;

// alert(`Hello ${store.getters.foo}!`);

let timer;

const getToday = () => {
  const date = new Date();
  console.log(date);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()-1}`;
};

const clearTimer = () => {
  store.commit('RESET_TIME');
  clearInterval(timer);
};

const saveTime = () => {
  if (store.state.currTab === '') return;
  localStorage.setItem(`${store.state.currTab}`, `${store.getters.currTabTimeTotal}`);
  // console.log(`save ${store.state.currTab} : ${store.getters.currTabTimeTotal}`);
  clearTimer();
};

const startTimer = () => {
  timer = setInterval(() => {
    store.commit('INCREMENT_TIME');
    // console.log(`time ${store.state.currTabTime}/${store.getters.currTabTimeTotal}`);
  }, 1000);
};

const getTime = () => {
  // console.log(`getTime(${store.state.currTab})-------`);
  const prevTime = Number(localStorage.getItem(`${store.state.currTab}`)) || 0;
  // console.log(`get ${store.state.currTab} : ${prevTime}`);
  store.commit('SET_CURR_TAB_PREV_TIME', prevTime);
};

const onGetTab = (tab) => {
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


const getUrl = (id) => {
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

const init = (id) => {
  const today = getToday();
  console.log(today);
  if (store.getters.today !== today) {
    store.commit('SET_TODAY', today);
  }
  getUrl(id);
};

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
  console.log(`activated tab ${tabId} / ${windowId}`);
  // chrome.runtime.sendMessage({ greeting: 'hello'}, (response) => {
  //     console.log(response.farewell);
  // });

  init(tabId);
});

init();
