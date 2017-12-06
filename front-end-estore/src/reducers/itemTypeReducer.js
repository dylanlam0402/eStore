import * as ActionTypes from "../types/ActionTypes";
import { createReducer } from "../utils/reducerUtil";

const initialState = {isLoading : false};



function saveItemTypeRequest(state, action)
{
  return Object.assign({}, state, {isSaving : true });
}
function saveItemTypeSuccess(state, action)
{
  return Object.assign({}, state, {  data : action.data, saveSuccess : true  });
}
function saveItemTypeFailure(state, action)
{
  return Object.assign({}, state, { errors : action.errors, saveSuccess : false  });
}
function getItemTypeRequest(state, action)
{
  return Object.assign({}, state, {isLoading : true });
}
function getItemTypeSuccess(state, action)
{
  return Object.assign({}, state, {  data : action.data, isLoading : false  });
}
function getItemTypeFailure(state, action)
{
  return Object.assign({}, state, { errors : action.errors, isLoading : false  });
}

export const itemTypeReducer = createReducer(initialState, {
  [ActionTypes.SAVE_ITEM_TYPE_REQUESTED] : saveItemTypeRequest,
  [ActionTypes.SAVE_ITEM_TYPE_SUCCESS] :saveItemTypeSuccess,
  [ActionTypes.SAVE_ITEM_TYPE_FAILURE] : saveItemTypeFailure,
  [ActionTypes.GET_ITEM_TYPE_REQUESTED] : getItemTypeRequest,
  [ActionTypes.GET_ITEM_TYPE_SUCCESS] :getItemTypeSuccess,
  [ActionTypes.GET_ITEM_TYPE_FAILURE] : getItemTypeFailure,

});