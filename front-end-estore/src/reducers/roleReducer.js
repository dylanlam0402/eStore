import * as ActionTypes from "../types/ActionTypes";
import { createReducer } from "../utils/reducerUtil";

const initialState = {isLoading : false};


function getRolesRequest(state, action)
{
  return Object.assign({}, state, { isLoading : true  });
}

function getRolesSuccess(state, action)
{
  return Object.assign({}, state, { data : action.data, isLoading : false  });
}

function getRolesFailure(state, action)
{
  return Object.assign({}, state, { errors : action.errors, isLoading : false,  });
}

export const roleReducer = createReducer(initialState, {
  [ActionTypes.GET_ROLES_REQUESTED] : getRolesRequest,
  [ActionTypes.GET_ROLES_SUCCESS] : getRolesSuccess,
  [ActionTypes.GET_ROLES_FAILURE] : getRolesFailure,
});