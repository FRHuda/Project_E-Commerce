const INITIAL_STATE = { cart: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'RENDER_CART':
            return action.payload;
        case 'CART_EMPTY':
            return INITIAL_STATE;
        case 'UPDATE_QTY':
            return action.payload;
        case 'SUBMIT_SUCCESS':
            return INITIAL_STATE;
        default:
            return state;
    }
};
