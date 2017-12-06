
import * as ActionTypes from "../types/ActionTypes";
import { createReducer } from "../utils/reducerUtil";
import _ from 'lodash'

const initialState = { isLoading: false };



function getWeeksRequest(state, action) {
  return Object.assign({}, state, { isLoading: true });
}

function getWeeksSuccess(state, action) {

  return Object.assign({}, state, { data: action.data, isLoading: false });
}
function getWeeksFailure(state, action) {
  return Object.assign({}, state, { errors: action.errors, isLoading: false });
}
function getIssuesByWeekRequest(state, action) {
  return Object.assign({}, state, { isLoading: true });
}

function getIssuesByWeekSuccess(state, action) {
  return Object.assign({}, state, { issues: action.data, isLoading: false });
}
function getIssuesByWeekFailure(state, action) {
  return Object.assign({}, state, { errors: action.errors, isLoading: false });
}
export const issueReducer = createReducer(initialState, {
  [ActionTypes.GET_WEEKS_REQUESTED]: getWeeksRequest,
  [ActionTypes.GET_WEEKS_SUCCESS]: getWeeksSuccess,
  [ActionTypes.GET_WEEKS_FAILURE]: getWeeksFailure,

  [ActionTypes.GET_ISSUES_BY_WEEK_REQUESTED]: getIssuesByWeekRequest,
  [ActionTypes.GET_ISSUES_BY_WEEK_SUCCESS]: getIssuesByWeekSuccess,
  [ActionTypes.GET_ISSUES_BY_WEEK_FAILURE]: getIssuesByWeekFailure

});






