import { sendRequest } from "./api";

module.exports = {
    login: function (sendData) {
        const type = "POST";
        const endpoint = "/api/users/login";
        const data = {
            username: sendData.username || "",
            password: sendData.password || "",
            withSecrete: true
        }

        return sendRequest(type, endpoint, data, {});
    },

    logout: function (sendData) {
        const type = "POST";
        const endpoint = "/api/users/logout";
        const data = {
            username: sendData.username || "",
            login_secrete: sendData.login_secrete || ""
        }

        return sendRequest(type, endpoint, data, {});
    },

    validUsername: function (sendData) {
        const type = "POST";
        const endpoint = "/api/users/validate";
        const data = {
            username: sendData.username || ""
        }

        return sendRequest(type, endpoint, data, {});
    },

    validPassword: function (sendData) {
        const type = "POST";
        const endpoint = "/api/users/validate";
        const data = {
            password: sendData.password || ""
        }

        return sendRequest(type, endpoint, data, {});
    },

    createAccount: function (sendData) {
        const type = "POST";
        const endpoint = "/api/users/create";
        const data = {
            username: sendData.username || "",
            password: sendData.password || ""
        }

        return sendRequest(type, endpoint, data, {});
    },

    fetchUserInfo: function (sendData) {
        const type = "POST";
        const endpoint = "/api/users/info";
        const data = {
            username: sendData.username || "",
            login_secrete: sendData.login_secrete || ""
        }

        return sendRequest(type, endpoint, data, {});
    },

    sendEmailForResetPassword: function (sendData) {
        const type = "POST";
        const endpoint = `/api/users/resetPassword/${sendData.username || ""}`;

        return sendRequest(type, endpoint, {}, {});
    },

    resetPasswordWithSecrete: function (sendData) {
        const type = "POST";
        const endpoint = `/api/users/internal/resetPassword/${sendData.temp_secrete || ""}`;
        const data = {
            username: sendData.username || "",
            password: sendData.password || "",
        }

        return sendRequest(type, endpoint, data, {});
    },

    updateUserProfile: function (sendData) {
        const type = "PUT";
        const endpoint = `/api/users/update`;

        const username = sendData.username || "";
        const login_secrete = sendData.login_secrete || "";

        delete sendData.username;
        delete sendData.login_secrete;

        const data = {
            username,
            login_secrete,
            changes: sendData
        }

        return sendRequest(type, endpoint, data, {});
    }
}