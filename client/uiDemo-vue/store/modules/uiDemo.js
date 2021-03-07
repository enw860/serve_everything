export const namespaced = true

const welcomPage = {
  category: "Welcome to",
  displayName: "UI Demo",
  widgetName: "Welcome",
}

export const state = {
  displayNav: false,
  mainContentView: welcomPage,
  screenMode: "regular"
};

export const mutations = {
  SET_NAV: function (state, event) {
    state.displayNav = event.displayNav;
  },
  SET_MAIN: function (state, event) {
    state.mainContentView = event.mainContentView;
  },
  SET_SCREEN_MODE: function (state, event) {
    state.screenMode = event.screenMode;
  }
};

export const actions = {
  openNav({ commit, dispatch }, event) {
    commit("SET_NAV", { displayNav: true });
  },
  hideNav({ commit, dispatch }, event) {
    commit("SET_NAV", { displayNav: false });
  },
  switchMainContent({ commit, dispatch }, mainContentView) {
    commit("SET_MAIN", { mainContentView: mainContentView || welcomPage });
  },
  switchScreenMode({ commit, dispatch }, screenMode) {
    commit("SET_SCREEN_MODE", { screenMode: screenMode || "" });
  },
};

export const getters = {};