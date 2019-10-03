import {combineReducers} from 'redux';
import bookReducer from './bookReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
    books: bookReducer,
    user: userReducer,
});

export default reducers;
