import { applyMiddleware, createStore, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { user } from './Reducers/userReducer';
import { weektime } from './Reducers/weektimeReducer';
// import { allReducers } from './Reducers/index';

const middleware = applyMiddleware(thunk, logger);

const reducer = combineReducers({
    user: user,
    weektime: weektime
});

export const store = createStore(reducer, middleware);