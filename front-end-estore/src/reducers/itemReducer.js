import * as ActionTypes from "../types/ActionTypes";
import { createReducer } from "../utils/reducerUtil";

const initialState = {isLoading : false};



function saveItemRequest(state, action)
{
  return Object.assign({}, state, {isSaving : true });
}
function saveItemSuccess(state, action)
{
  return Object.assign({}, state, {  data : action.data, saveSuccess : true  });
}
function saveItemFailure(state, action)
{
  return Object.assign({}, state, { errors : action.errors, saveSuccess : false  });
}
function getItemRequest(state, action)
{
  return Object.assign({}, state, {isLoading : true });
}
function getItemSuccess(state, action)
{
  return Object.assign({}, state, {  item : action.data, isLoading : false  });
}
function getItemFailure(state, action)
{
  return Object.assign({}, state, { errors : action.errors, isLoading : false  });
}
function getItemsRequest(state, action)
{
  return Object.assign({}, state, {isLoading : true });
}
function getItemsSuccess(state, action)
{
  return Object.assign({}, state, {  items : action.data, isLoading : false  });
}
function getItemsFailure(state, action)
{
  return Object.assign({}, state, { errors : action.errors, isLoading : false  });
}
export const itemReducer = createReducer(initialState, {
  [ActionTypes.SAVE_ITEM_REQUESTED] : saveItemRequest,
  [ActionTypes.SAVE_ITEM_SUCCESS] :saveItemSuccess,
  [ActionTypes.SAVE_ITEM_FAILURE] : saveItemFailure,
  [ActionTypes.GET_ITEMS_REQUESTED] : getItemsRequest,
  [ActionTypes.GET_ITEMS_SUCCESS] :getItemsSuccess,
  [ActionTypes.GET_ITEMS_FAILURE] : getItemsFailure,
  [ActionTypes.GET_ITEM_REQUESTED] : getItemRequest,
  [ActionTypes.GET_ITEM_SUCCESS] :getItemSuccess,
  [ActionTypes.GET_ITEM_FAILURE] : getItemFailure,
});