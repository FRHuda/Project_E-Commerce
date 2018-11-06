const INITIAL_STATE = { open: '', item: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_STATE':
            return action.payload;
        case 'CLOSE_STATE':
            return INITIAL_STATE;
        default:
            return state;
    }
}