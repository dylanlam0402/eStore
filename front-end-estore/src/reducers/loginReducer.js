
import * as ActionTypes from "../types/ActionTypes";
import * as ErrorTypes from "../types/ErrorTypes"
import { createReducer } from "../utils/reducerUtil";

const initialState = {isLoading : false};


function loginRequest(state, action)
{
  return Object.assign({}, state, { isLoading : true  });
}

function loginSuccess(state, action)
{

  return Object.assign({}, state, {  isAuthenticated : true, isLoading : false  });
}

function loginFailure(state, action)
{
  if(action.errors[0].type == ErrorTypes.UNAUTHENTICATION)
  {
    return Object.assign({}, state, { errors: action.errors, isLoading : false  , isAuthenticated : false});
  }
  else
  {
    return Object.assign({}, state, { errors: action.errors, isLoading : false  });
  }
}

// DOmain
function getDomainsRequest(state, action)
{
  return Object.assign({}, state  );
}

function getDomainsSuccess(state, action)
{
  return Object.assign({}, state, { domains : action.data,  });
}

function getDomainsFailure(state, action)
{
  return Object.assign({}, state, { errors : action.errors,   });
}

export const loginReducer = createReducer(initialState, {
  [ActionTypes.LOGIN_REQUESTED] : loginRequest,
  [ActionTypes.LOGIN_SUCCESS] : loginSuccess,
  [ActionTypes.LOGIN_FAILURE] : loginFailure,
  [ActionTypes.GET_DOMAINS_REQUESTED] : getDomainsRequest,
  [ActionTypes.GET_DOMAINS_SUCCESS] : getDomainsSuccess,
  [ActionTypes.GET_DOMAINS_FAILURE] : getDomainsFailure
});