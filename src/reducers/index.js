import isLogged from './user';
import { combineReducers } from 'redux';
import { username, userid, useremail, userrole } from './userInfo';

const allReducers = combineReducers({
    isLogged,
    username,
    userid,
    useremail,
    userrole
});

const rootReducer = (state, action) => {
    if(action.type === 'LOG_OUT') {
        state = undefined;
    }
    
    return allReducers(state, action);
}

export { rootReducer };