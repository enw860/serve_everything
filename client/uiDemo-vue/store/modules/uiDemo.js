export const namespaced = true

export const state = {
  displayNav: false,
  mainContentView: ""
};

export const mutations = {
  SET_NAV: function (state, event) {
    state.displayNav = event.displayNav;
  },
  SET_MAIN: function (state, event) {
    state.mainContentView = event.mainContentView;
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
    commit("SET_MAIN", { mainContentView: mainContentView || "" });
  },
};

export const getters = {};