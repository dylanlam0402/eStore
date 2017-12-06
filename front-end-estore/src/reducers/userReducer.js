import * as ActionTypes from "../types/ActionTypes";
import { createReducer } from "../utils/reducerUtil";

const initialState = {isLoading : false};


function getUsersRequest(state, action)
{
  return Object.assign({}, state, { isLoading : true  });
}

function getUsersSuccess(state, action)
{
  return Object.assign({}, state, { data : action.data, isLoading : false  });
}

function getUsersFailure(state, action)
{
  return Object.assign({}, state, { errors: action.errors, isLoading : false,   });
}

export const userReducer = createReducer(initialState, {
  [ActionTypes.GET_USERS_REQUESTED] : getUsersRequest,
  [ActionTypes.GET_USERS_SUCCESS] : getUsersSuccess,
  [ActionTypes.GET_USERS_FAILURE] : getUsersFailure,
});