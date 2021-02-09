import * as auth from "../../../api/auth";

export const namespaced = true

export const state = {
    login: {},
    signup: {},
    resetPasswordStep1: {},
    resetPasswordStep2: {},
    resetPasswordStep3: {},
    validateName: {},
    validatePassword: {},
};

export const mutations = {
    SET_LOGIN_RESULT: function (state, event) {
        state.login = event ? Object.assign({}, {
            result: event.result,
            success: event.success
        }) : {};
    },
    SET_SIGNUP_RESULT: function (state, event) {
        state.signup = event ? Object.assign({}, {
            result: event.result,
            success: event.success
        }) : {};
    },
    SET_VALIDATE_USERNAME: function (state, event) {
        state.validateName = event ? Object.assign({}, {
            valid: event.valid,
            detail: event.detail
        }) : {};
    },
    SET_VALIDATE_PASSWORD: function (state, event) {
        state.validatePassword = event ? Object.assign({}, {
            valid: event.valid,
            detail: event.detail
        }) : {};
    },
    SET_RPASSWORD_S1: function (state, event) {
        state.resetPasswordStep1 = event ? Object.assign({}, {
            result: event.result,
            success: event.success
        }) : {};
    },
    SET_RPASSWORD_S2: function (state, event) {
        state.resetPasswordStep2 = event ? Object.assign({}, {
            result: event.result,
            success: event.success
        }) : {};
    },
    SET_RPASSWORD_S3: function (state, event) {
        state.resetPasswordStep3 = event ? Object.assign({}, {
            result: event.result,
            success: event.success
        }) : {};
    },
};

export const actions = {
    cleanCache({ commit, dispatch }, { data, onSuccess } = {}) {
        commit("SET_LOGIN_RESULT");
        commit("SET_SIGNUP_RESULT");
        commit("SET_VALIDATE_USERNAME");
        commit("SET_VALIDATE_PASSWORD");
    },
    login({ commit, dispatch }, { data, onSuccess } = {}) {
        auth.login(data).then(data => {
            commit("SET_LOGIN_RESULT", { result: data, success: data.success });
            !!data.success && onSuccess && onSuccess();
        }).catch(err => {
            commit("SET_LOGIN_RESULT", { result: err, success: false });
        })
    },
    signup({ commit, dispatch }, { data, onSuccess } = {}) {
        auth.createAccount(data).then(data => {
            commit("SET_SIGNUP_RESULT", { result: data, success: data.success });
            !!data.success && onSuccess && onSuccess();
        }).catch(err => {
            commit("SET_SIGNUP_RESULT", { result: err, success: false });
        })
    },
    validateUsername({ commit, dispatch }, { data, onSuccess } = {}) {
        auth.validUsername(data).then(data => {
            const { valid, detail } = (data.detail || {});
            commit("SET_VALIDATE_USERNAME", { valid: !!valid, detail });
            !!data.valid && onSuccess && onSuccess();
        }).catch(err => {
            commit("SET_VALIDATE_USERNAME", { valid: false, detail: {} });
        })
    },
    validatePassword({ commit, dispatch }, { data, onSuccess } = {}) {
        auth.validPassword(data).then(data => {
            const { valid, detail } = (data.detail || {});
            commit("SET_VALIDATE_PASSWORD", { valid: !!valid, detail });
            !!data.valid && onSuccess && onSuccess();
        }).catch(err => {
            commit("SET_VALIDATE_PASSWORD", { valid: false, detail: {} });
        })
    },
    resetPasswordStep1({ commit, dispatch }, { data, onSuccess } = {}) {
        auth.sendEmailForResetPassword(data).then(data => {
            const { success, message } = data;
            commit("SET_RPASSWORD_S1", { result: { message }, success });
            !!data.success && onSuccess && onSuccess();
        }).catch(err => {
            commit("SET_RPASSWORD_S1", { result: {}, success: false });
        })
    },
    resetPasswordStep2({ commit, dispatch }, { data, onSuccess } = {}) {
        auth.validResetPasswordSecrete(data).then(data => {
            const { success, detail } = data;
            commit("SET_RPASSWORD_S2", { result: detail, success });
            !!data.success && onSuccess && onSuccess();
        }).catch(err => {
            commit("SET_RPASSWORD_S2", { result: {}, success: false });
        })
    },
    resetPasswordStep3({ commit, dispatch }, { data, onSuccess } = {}) {
        auth.resetPasswordWithSecrete(data).then(data => {
            const { success, detail } = data;
            commit("SET_RPASSWORD_S3", { result: detail, success });
            !!data.success && onSuccess && onSuccess();
        }).catch(err => {
            commit("SET_RPASSWORD_S3", { result: {}, success: false });
        })
    },
};

export const getters = {};