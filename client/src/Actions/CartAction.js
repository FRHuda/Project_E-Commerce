import axios from 'axios';
import { API_URL_MYSQL, API_URL_MONGODB } from '../Supports/api-url/apiurl';

export const showCart = idUser => {
    return dispatch => {
        axios
            .get(`${API_URL_MYSQL}/cart/${idUser}`)
            .then(res => {
                if (res !== '') {
                    dispatch({
                        type: 'RENDER_CART',
                        payload: { cart: res.data },
                    });
                } else {
                    dispatch({
                        type: 'CART_EMPTY',
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const addToCart = (idUser, idProduct) => {

    return dispatch => {
        axios
            .post(`${API_URL_MYSQL}/addtocart`, {
                idUser,
                idProduct,
            })
            .then(res => {
                alert('Added to Cart');
                dispatch({
                    type: 'RENDER_CART',
                    payload: { cart: res.data },
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const deleteCart = (idUser, idProduct) => {
    return dispatch => {
        axios
            .delete(`${API_URL_MYSQL}/deletecart?iduser=${idUser}&idproduct=${idProduct}`)
            .then(res => {
                alert('Delete from Cart Success');
                dispatch({
                    type: 'RENDER_CART',
                    payload: { cart: res.data },
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const updateQty = (idUser, idCart, qty) => {
    return dispatch => {
        axios.put(`${API_URL_MYSQL}/qty/${idCart}`, {
            qty,
            idUser
        }).then(res => {
            dispatch({
                type: 'UPDATE_QTY',
                payload: { cart: res.data }
            });
        }).catch(err => {
            console.log(err);
        })
    }
}

export const submitOrder = (idUser, cart, billingAddress) => {
    return dispatch => {
        axios.post(`${API_URL_MONGODB}/addorderhistory`, {
            idUser,
            cart,
            billingAddress
        }).then(res => {
            console.log(res);
            axios.delete(`${API_URL_MYSQL}/deletecartorder/${idUser}`)
                .then(res => {
                    console.log('From Delete');
                    console.log(res);
                    dispatch({
                        type: 'SUBMIT_SUCCESS'
                    })
                })
        }).catch(err => {
            console.log(err);
        })
    }
};