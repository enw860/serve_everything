import { sendRequest, yieldRequest } from "./api";

export function login(sendData = {}, isYield = false) {
    const type = "POST";
    const endpoint = "/api/users/login";
    const data = {
        username: sendData.username || "",
        password: sendData.password || "",
    }

    const ongoingRequest = !!isYield ? yieldRequest : sendRequest;
    return ongoingRequest(type, endpoint, data, {});
}

export function logout(sendData = {}, isYield = false) {
    const type = "POST";
    const endpoint = "/api/users/logout";
    const data = {
        username: sendData.username || "",
    }

    const ongoingRequest = !!isYield ? yieldRequest : sendRequest;
    return ongoingRequest(type, endpoint, data, {});
}

export function validUsername(sendData = {}, isYield = false) {
    const type = "POST";
    const endpoint = "/api/users/validate";
    const data = {
        username: sendData.username || ""
    }

    const ongoingRequest = !!isYield ? yieldRequest : sendRequest;
    return ongoingRequest(type, endpoint, data, {});
}

export function validPassword(sendData = {}, isYield = false) {
    const type = "POST";
    const endpoint = "/api/users/validate";
    const data = {
        password: sendData.password || ""
    }

    const ongoingRequest = !!isYield ? yieldRequest : sendRequest;
    return ongoingRequest(type, endpoint, data, {});
}

export function createAccount(sendData = {}, isYield = false) {
    const type = "POST";
    const endpoint = "/api/users/create";
    const data = {
        username: sendData.username || "",
        password: sendData.password || ""
    }

    const ongoingRequest = !!isYield ? yieldRequest : sendRequest;
    return ongoingRequest(type, endpoint, data, {});
}

export function fetchUserInfo(sendData = {}, isYield = false) {
    const type = "POST";
    const endpoint = "/api/users/info";
    const data = {
        username: sendData.username || "",
    }

    const ongoingRequest = !!isYield ? yieldRequest : sendRequest;
    return ongoingRequest(type, endpoint, data, {});
}

export function sendEmailForResetPassword(sendData = {}, isYield = false) {
    const type = "POST";
    const endpoint = `/api/users/resetPassword/${sendData.username || ""}`;

    const ongoingRequest = !!isYield ? yieldRequest : sendRequest;
    return ongoingRequest(type, endpoint, {}, {});
}

export function resetPasswordWithSecrete(sendData = {}, isYield = false) {
    const type = "POST";
    const endpoint = `/api/users/internal/resetPassword/${sendData.temp_secrete || ""}`;
    const data = {
        username: sendData.username || "",
        password: sendData.password || "",
    }

    const ongoingRequest = !!isYield ? yieldRequest : sendRequest;
    return ongoingRequest(type, endpoint, data, {});
}

export function updateUserProfile(sendData = {}, isYield = false) {
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

    const ongoingRequest = !!isYield ? yieldRequest : sendRequest;
    return ongoingRequest(type, endpoint, data, {});
}
