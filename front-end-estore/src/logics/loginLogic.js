import { createLogic } from 'redux-logic';
import * as ActionTypes from '../types/ActionTypes'

const loginLogic = createLogic({
    type: ActionTypes.LOGIN, // only apply this logic to this type
    latest: true, // only take latest
/*
    validate({ getState, action }, allow, reject) {
        if (true) { // can also hit server to check
          allow(action);
        } else {
          reject({ type: ActionTypes.LOGIN_SUCCESS })
        }
    },
*/
    process({ getState, action, api }, dispatch, done) {

        dispatch({ type: ActionTypes.LOGIN_REQUESTED });

        api.services.userService.authenticate(action.email, action.password)
        .then(result => {
            if(result.access_token !== undefined)
            {
                document.cookie  = "AUTHORIZATION=" +result.access_token;
                // api.services.userService.getRole()
              
                    if(result){
                        dispatch({ type: ActionTypes.LOGIN_SUCCESS, data: result.access_token  });
                    }
                    else{
                        dispatch({ type: ActionTypes.LOGIN_FAILURE, data: result.errors });
                    }
                
               
            }
            else
            {
                dispatch({ type: ActionTypes.LOGIN_FAILURE, data: result.errors });
            } 
        }).then(()=> done())
    }
  });

  export default [
    loginLogic,
  ]