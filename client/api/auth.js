import { sendRequest, yieldRequest } from "./api";

module.exports = {
    login: function (sendData = {}, yield = false) {
        const type = "POST";
        const endpoint = "/api/users/login";
        const data = {
            username: sendData.username || "",
            password: sendData.password || "",
        }

        const ongoingRequest = !!yield ? yieldRequest : sendRequest;
        return ongoingRequest(type, endpoint, data, {});
    },

    logout: function (sendData = {}, yield = false) {
        const type = "POST";
        const endpoint = "/api/users/logout";
        const data = {
            username: sendData.username || "",
        }

        const ongoingRequest = !!yield ? yieldRequest : sendRequest;
        return ongoingRequest(type, endpoint, data, {});
    },

    validUsername: function (sendData = {}, yield = false) {
        const type = "POST";
        const endpoint = "/api/users/validate";
        const data = {
            username: sendData.username || ""
        }

        const ongoingRequest = !!yield ? yieldRequest : sendRequest;
        return ongoingRequest(type, endpoint, data, {});
    },

    validPassword: function (sendData = {}, yield = false) {
        const type = "POST";
        const endpoint = "/api/users/validate";
        const data = {
            password: sendData.password || ""
        }

        const ongoingRequest = !!yield ? yieldRequest : sendRequest;
        return ongoingRequest(type, endpoint, data, {});
    },

    createAccount: function (sendData = {}, yield = false) {
        const type = "POST";
        const endpoint = "/api/users/create";
        const data = {
            username: sendData.username || "",
            password: sendData.password || ""
        }

        const ongoingRequest = !!yield ? yieldRequest : sendRequest;
        return ongoingRequest(type, endpoint, data, {});
    },

    fetchUserInfo: function (sendData = {}, yield = false) {
        const type = "POST";
        const endpoint = "/api/users/info";
        const data = {
            username: sendData.username || "",
        }

        const ongoingRequest = !!yield ? yieldRequest : sendRequest;
        return ongoingRequest(type, endpoint, data, {});
    },

    sendEmailForResetPassword: function (sendData = {}, yield = false) {
        const type = "POST";
        const endpoint = `/api/users/resetPassword/${sendData.username || ""}`;

        const ongoingRequest = !!yield ? yieldRequest : sendRequest;
        return ongoingRequest(type, endpoint, {}, {});
    },

    resetPasswordWithSecrete: function (sendData = {}, yield = false) {
        const type = "POST";
        const endpoint = `/api/users/internal/resetPassword/${sendData.temp_secrete || ""}`;
        const data = {
            username: sendData.username || "",
            password: sendData.password || "",
        }

        const ongoingRequest = !!yield ? yieldRequest : sendRequest;
        return ongoingRequest(type, endpoint, data, {});
    },

    updateUserProfile: function (sendData = {}, yield = false) {
        const type = "PUT";
        const endpoint = `/api/users/update`;

        const username = sendData.username || "";

        delete sendData.username;
        delete sendData.login_secrete;

        const data = {
            username,
            login_secrete,
            changes: sendData
        }

        const ongoingRequest = !!yield ? yieldRequest : sendRequest;
        return ongoingRequest(type, endpoint, data, {});
    }
}