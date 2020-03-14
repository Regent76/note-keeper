import {userService} from '../services/';
import {history} from '../helpers';

export const userActions = {
    register,
    login,
    logout
};

function login(email, password) {
    return dispatch => {
        let apiEndpoint = 'auth/login';
        let payload = {
            email: email,
            password: password
        };
        userService.post(apiEndpoint, payload)
            .then((response) => {
                if (response && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('auth', response.data.auth);
                    dispatch(setUserDetails(response.data));
                    history.push('/home');
                }
            })
    };
}

function register(email, password) {
    return dispatch => {
        let apiEndpoint = 'auth/register';
        let payload = {
            email: email,
            password: password
        };
        userService.post(apiEndpoint, payload)
            .then((response) => {
                if (response && response.data.message === 'User created.') {
                    dispatch(setUserDetails(response.data));
                    history.push('/');
                } else {
                    throw new Error("Check login and password.");
                }
                console.log(response);
            }).catch((error) => {
            console.log(error.config);
        });
    };
}

function logout() {
    return dispatch => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        dispatch(logoutUser());
        history.push('/');
    }
}

export function setUserDetails(user) {
    return {
        type: "LOGIN_SUCCESS",
        auth: user.auth,
        token: user.token
    }
}

export function logoutUser() {
    return {
        type: "LOGOUT_SUCCESS",
        auth: false,
        token: ''
    }
}