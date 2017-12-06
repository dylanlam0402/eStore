import * as ActionTypes from '../../types/ActionTypes';
import { userService }  from '../../services/Services'; 
import { createAction, createCustomAction } from '../../utils/actionUtil';

/* Don't use createCustomAction because it hasn't worked yet :)
export const test = (email, password, domain) => createCustomAction({
    type: ActionTypes.LOGIN,
    email: email,
    password: password,
    domain: domain
});

*/

export const doLogin = (email, password) => ({
    type: ActionTypes.LOGIN,
    email: email,
    password: password
});

