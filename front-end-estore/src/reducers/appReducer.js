import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';


import { userReducer } from './userReducer';

import {itemTypeReducer} from './itemTypeReducer'
import {cartReducer} from './cartReducer'
import {itemReducer} from './itemReducer'
// Use ES6 object literal shorthand syntax to define the object shape
const combineReducer = combineReducers({
    loginReducer,

    userReducer,

    itemTypeReducer,
    cartReducer, itemReducer
});

export default combineReducer;