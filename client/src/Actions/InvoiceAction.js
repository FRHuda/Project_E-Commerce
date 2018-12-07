

export const addStateInvoice = (transactionId, status) => {
    return {
        type: 'ADD_STATE_INVOICE',
        payload: { open: 'open', transactionId: transactionId, status: status, openUpload: '', transactionIdUpload: 0 }
    };
};

export const addStateInvoiceUpload = (transactionId, status) => {
    return {
        type: 'ADD_STATE_INVOICE',
        payload: { openUpload: 'open', transactionIdUpload: transactionId, status: status, open: '', transactionId: 0 }
    };
};


export const confirmPayment = () => {
    return {
        type: 'CLOSE_STATE'
    }
}

export const rejectPayment = () => {
    return {
        type: 'CLOSE_STATE'
    }
}