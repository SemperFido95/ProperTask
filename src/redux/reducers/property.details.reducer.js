const propertyDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROPERTY_DETAILS':
            return action.payload;
        case 'CLEAR_PROPERTY_DETAILS':
            state = {}
        default:
            return state;
    }
};

export default propertyDetailsReducer;