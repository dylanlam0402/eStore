import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { issueReducer } from './issueReducer';
import { roleReducer } from './roleReducer';
import { userReducer } from './userReducer';
import {projectReducer} from './projectReducer'
import {itemTypeReducer} from './itemTypeReducer'
import {cartReducer} from './cartReducer'
// Use ES6 object literal shorthand syntax to define the object shape
const combineReducer = combineReducers({
    loginReducer,
    roleReducer,
    userReducer,
    projectReducer,
    issueReducer,
    itemTypeReducer,
    cartReducer
});

export default combineReducer;