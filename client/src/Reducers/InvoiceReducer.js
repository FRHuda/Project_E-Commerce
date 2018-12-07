const INITIAL_STATE = { open: '', transactionId: 0, status: '', openUpload: '', transactionIdUpload: 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_STATE_INVOICE':
            return action.payload;
        case 'CLOSE_STATE':
            return INITIAL_STATE;
        default:
            return state;
    }
}