const INITIAL_STATE = {
    username: '',
    email: '',
    idUser: 0,
    error: '',
    statusId: 0,
    phone: null,
    cookieCheck: false,
    loading: false,
    birthday: '',
    editProfile: false,
    editAlamat: false,
    alamat: ''
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
        case "EDIT_PROFILE":
            return { ...state, editProfile: true };
        case "EDIT_PROFILE_SUCCESS":
            return { ...state, editProfile: false };
        case "EDIT_ALAMAT":
            return { ...state, editAlamat: true };
        case "EDIT_ALAMAT_SUCCESS":
            return { ...state, editAlamat: false };
        default:
            return state;
    }
};
