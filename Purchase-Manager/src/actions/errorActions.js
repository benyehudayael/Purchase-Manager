export const setError = (error) => {
    return {
        type: 'SET_ERROR',
        payload: error
    };
};

export const deleteError = () => {
    return {
        type: 'DELETE_ERROR'
    };
};