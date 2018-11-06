

export const addState = (item) => {
    return {
        type: 'ADD_STATE',
        payload: { item: item, open: 'open' }
    };
};

export const closePopUp = () => {
    return {
        type: 'CLOSE_STATE'
    }
}