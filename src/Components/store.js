import { createStore } from 'redux';
import { rootReducer } from '../reducers';
import isLogged from '../reducers/user';
import { username, userid, useremail, userrole } from '../reducers/userInfo'

const store = createStore(rootReducer, [isLogged, username, userid, useremail, userrole] + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;