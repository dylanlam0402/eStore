import * as ActionTypes from "../types/ActionTypes";
import { createReducer } from "../utils/reducerUtil";

const initialState = {isLoading : false};


function getProjectsRequest(state, action)
{
  return Object.assign({}, state, { isLoading : true  });
}

function getProjectsSuccess(state, action)
{
  return Object.assign({}, state, { data : action.data, isLoading : false  });
}

function getProjectsFailure(state, action)
{
  return Object.assign({}, state, { errors : action.errors, isLoading : false,   });
}

function saveProjectsRequest(state, action)
{
  return Object.assign({}, state, {isSaving : true });
}
function saveProjectsSuccess(state, action)
{
  return Object.assign({}, state, {  data : action.data, saveSuccess : true  });
}
function saveProjectsFailure(state, action)
{
  return Object.assign({}, state, { errors : action.errors, saveSuccess : false  });
}

export const projectReducer = createReducer(initialState, {
  [ActionTypes.GET_PROJECTS_REQUESTED] : getProjectsRequest,
  [ActionTypes.GET_PROJECTS_SUCCESS] : getProjectsSuccess,
  [ActionTypes.GET_PROJECTS_FAILURE] : getProjectsFailure,
  [ActionTypes.SAVE_PROJECTS_REQUESTED] : saveProjectsRequest,
  [ActionTypes.SAVE_PROJECTS_SUCCESS] :saveProjectsSuccess,
  [ActionTypes.SAVE_PROJECTS_FAILURE] : saveProjectsFailure,
});