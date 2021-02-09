export const namespaced = true

export const state = {
    mainContentView: "Login"
};

export const mutations = {
    SET_MAIN: function (state, event) {
        state.mainContentView = event.mainContentView;
    }
};

export const actions = {
    switchMainContent({ commit, dispatch }, mainContentView) {
        commit("SET_MAIN", { mainContentView: mainContentView || "" });
    },
};

export const getters = {};