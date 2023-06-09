import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import propertyTasks from './PropertyTask.reducer';
import propertyDetails from './property.details.reducer';
import modalReducer from './open.reducer';
import taskReducer from './task.reducer';
import propertyListReducer from './propertyList.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  propertyTasks,
  propertyDetails,
  modalReducer,
  taskReducer,
  propertyListReducer,
});

export default rootReducer;
