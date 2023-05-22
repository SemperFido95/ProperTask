const propertyTaskReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROPERTY_TASKS':
            return action.payload;
        default:
            return state;
    }
};

export default propertyTaskReducer;