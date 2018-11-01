const INITIAL_STATE = {
    username: '',
    email: '',
    idUser: 0,
    error: '',
    statusId: 0,
    cookieCheck: false,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
            return action.payload;
        case 'USER_LOGIN_FAIL':
            return { ...state, error: 'Authentication Error', loading: false };
        case 'USER_LOGOUT':
            return { ...INITIAL_STATE, cookieCheck: true };
        case "COOKIES_CHECKED":
            return { ...state, cookieCheck: true, loading: false };
        case "LOADING":
            return { ...state, loading: true }
        default:
            return state;
    }
};
