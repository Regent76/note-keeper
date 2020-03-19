import {userService} from "../services/";
import {history} from "../helpers";

export function setRegisterError(error) {
    return {
        type: "REGISTER_ERROR",
        errorMessage: error.data.message || "Something goes wrong.",
    };
}

export function setUserDetails(user) {
    return {
        type: "LOGIN_SUCCESS",
        auth: user.auth,
        token: user.token
    };
}

export function logoutUser() {
    return {
        type: "LOGOUT_SUCCESS",
        auth: false,
        token: ""
    };
}

function login(email, password) {
    return (dispatch) => {
        let apiEndpoint = "auth/login";
        let payload = {
            email,
            password
        };
        userService.post(apiEndpoint, payload)
            .then((response) => {
                if (response && response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("auth", response.data.auth);
                    dispatch(setUserDetails(response.data));
                    history.push("/home");
                }
            });
    };
}

function register(email, password) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            let apiEndpoint = "auth/register";
            let payload = {
                email,
                password
            };
            userService.post(apiEndpoint, payload)
                .then((response) => {
                    if (response && response.data.message === "User created.") {
                        dispatch(setUserDetails(response.data));
                        history.push("/");
                    }
                }).catch((err) => {
                dispatch(setRegisterError(err.response));
            });
        });
    };
}

function logout() {
    return (dispatch) => {
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        dispatch(logoutUser());
        history.push("/");
    };
}

export const userActions = {
    register,
    login,
    logout,
};
