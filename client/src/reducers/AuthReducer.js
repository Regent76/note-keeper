let token = localStorage.getItem('token');
let auth = localStorage.getItem('auth');

const initialState = auth ? {loggedIn: true, auth, token} : { errorMessage: ''};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                loggingIn: true,
                auth: action.auth,
                token: action.token
            });
        case 'REGISTER_ERROR':
            return Object.assign({}, state, {
                errorMessage: action.errorMessage.message,
            });
        case 'REGISTER_SUCCESS':
            return Object.assign({}, state, {
                registerDone: true,
            });
        case 'LOGOUT_SUCCESS':
            return Object.assign({}, state, {
                auth: false
            });
        default:
            return state
    }
}