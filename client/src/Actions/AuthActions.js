import axios from 'axios';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';

// ACTION LOGIN REGISTER PAGE

export const onLogin = user => {
    return dispatch => {
        dispatch({ type: "LOADING" });
        axios
            .get(`${API_URL_MYSQL}/login`, {
                params: {
                    email: user.email,
                    password: user.password,
                },
            })
            .then(user => {
                if (user.data !== '') {
                    dispatch({
                        type: 'USER_LOGIN_SUCCESS',
                        payload: {
                            username: user.data.Username,
                            email: user.data.Email,
                            idUser: user.data.Id,
                            statusId: user.data.StatusId,
                            error: '',
                            loading: false
                        },
                    });
                    dispatch({
                        type: "COOKIES_CHECKED"
                    })
                } else {
                    dispatch({
                        type: 'USER_LOGIN_FAIL',
                    });
                }
            });
    };
};

export const onLogOut = () => {
    return {
        type: 'USER_LOGOUT',
    };
};

export const onRegister = user => {
    return dispatch => {
        dispatch({ type: "LOADING" });
        axios
            .post(`${API_URL_MYSQL}/addakun`, {
                Username: user.Username,
                Email: user.Email,
                Password: user.Password,
            })
            .then(res => {
                console.log(res.data[0]);
                dispatch({
                    type: 'USER_LOGIN_SUCCESS',
                    payload: {
                        username: res.data[0].Username,
                        email: res.data[0].Email,
                        idUser: res.data[0].Id,
                        statusId: res.data[0].StatusId,
                        error: '',
                        loading: false
                    },
                });
                dispatch({
                    type: "COOKIES_CHECKED"
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const keepLogin = email => {
    return dispatch => {
        axios
            .get(`${API_URL_MYSQL}/keeplogin`, {
                params: {
                    email: email,
                },
            })
            .then(user => {
                if (user.data !== '') {
                    dispatch({
                        type: 'USER_LOGIN_SUCCESS',
                        payload: {
                            username: user.data.Username,
                            email: user.data.Email,
                            idUser: user.data.Id,
                            statusId: user.data.StatusId,
                            error: '',
                            loading: false
                        },
                    });
                    dispatch({
                        type: "COOKIES_CHECKED"
                    });
                }
                else {
                    dispatch({
                        type: 'USER_LOGIN_FAIL',
                    });
                }
            });
    };
};

export const cookieChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    };
}