import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import userDetails from '@reducers_LoginReducers';
const rootreducer = combineReducers({
  userDetails: userDetails, 
  });
  const configureStore = () => {
    return createStore(rootreducer, applyMiddleware(thunk, createLogger));
  };
  export default configureStore;