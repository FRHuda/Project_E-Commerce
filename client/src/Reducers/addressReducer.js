const INITIAL_STATE = { Address: '', PostCode: '', TownCity: '', Province: '', UserId: 0 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_ADDRESS_SUCCESS":
            return action.payload;
        case "EDIT_ALAMAT":
            return { ...state, editAlamat: true };
        case "EDIT_ALAMAT_SUCCESS":
            return { ...state, editAlamat: false };
        default:
            return state;
    }
};