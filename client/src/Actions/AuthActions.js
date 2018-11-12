import axios from 'axios';
import { API_URL_MYSQL, API_URL_MONGODB } from '../Supports/api-url/apiurl';

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
                            loading: false,
                            phone: user.data.Phone,
                            birthday: user.data.Birthday
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
                            loading: false,
                            phone: user.data.Phone,
                            birthday: user.data.Birthday
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

export const updateAkun = (user, id) => {
    return dispatch => {
        dispatch({ type: "EDIT_PROFILE" });
        axios
            .put(`${API_URL_MYSQL}/updateakun/${id}`, {
                Username: user.username,
                Email: user.email,
                Phone: user.phone,
                Birthday: user.birthday
            })
            .then(res => {
                dispatch({
                    type: 'USER_LOGIN_SUCCESS',
                    payload: {
                        username: res.data[0].Username,
                        email: res.data[0].Email,
                        idUser: res.data[0].Id,
                        statusId: res.data[0].StatusId,
                        error: '',
                        loading: false,
                        phone: res.data[0].Phone,
                        birthday: res.data[0].Birthday,
                        editProfile: false
                    },
                });
                dispatch({
                    type: "COOKIES_CHECKED"
                });
            })
            .catch(err => {
                console.log('Terjadi Error');
                console.log(err);
                editProfileSuccess();
            });
    }
}
//ADDRESS ACTION
export const getAddress = (id) => {
    return dispatch => {
        axios.get(`${API_URL_MYSQL}/address/${id}`)
            .then(res => {
                dispatch({
                    type: "GET_ADDRESS_SUCCESS",
                    payload: res.data[0]
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const addAddress = (item) => {
    return dispatch => {
        axios.post(`${API_URL_MYSQL}/address`, {
            Address: item.address,
            PostCode: item.postcode,
            TownCity: item.towncity,
            Province: item.province,
            UserId: item.id
        })
            .then(res => {
                dispatch({
                    type: "GET_ADDRESS_SUCCESS",
                    payload: res.data[0]
                })
            })
            .catch(err => {
                console.log('Terjadi error');
                console.log(err);
            })
    }
}

export const updateAddress = (data, id) => {
    return dispatch => {
        dispatch({ type: "EDIT_ADDRESS" });
        axios
            .put(`${API_URL_MYSQL}/address/${id}`, {
                Address: data.Address,
                PostCode: data.PostCode,
                TownCity: data.TownCity,
                Province: data.Province
            })
            .then(res => {
                dispatch({
                    type: 'GET_ADDRESS_SUCCESS',
                    payload: res.data[0]
                });
            })
            .catch(err => {
                console.log('Terjadi Error');
                console.log(err);
                editProfileSuccess();
            });
    }
}




export const editProfileSuccess = () => {
    return {
        type: "EDIT_PROFILE_SUCCESS"
    }
}

export const cookieChecked = () => {
    return {
        type: "COOKIES_CHECKED"
    };
}