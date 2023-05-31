const propertyListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROPERTY_LIST':
            return action.payload;
        default:
            return state;
    }
};

export default propertyListReducer;