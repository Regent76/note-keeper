import axios from "axios";
import config from "../config/Config";

// axios default configs
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common = {
    "Authorization": "Bearer " + localStorage.getItem("token")
};

function get(apiEndpoint) {
    return axios.get(config.baseUrl + apiEndpoint).then((response) => {
        return response;
    }).catch((err) => {
    });
}

function post(apiEndpoint, payload) {
    return axios.post(config.baseUrl + apiEndpoint, payload).then((response) => {
        return response;
    });
}

function put(apiEndpoint, payload) {
    return axios.put(config.baseUrl + apiEndpoint, payload).then((response) => {
        return response;
    }).catch((err) => {
    });
}

function deleteDetail(apiEndpoint) {
    return axios.delete(config.baseUrl + apiEndpoint).then((response) => {
        return response;
    }).catch((err) => {
    });
}

export const userService = {
    get,
    post,
    put,
    deleteDetail
};