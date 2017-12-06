
import * as Types from "../types/ActionTypes";
import _ from 'lodash'

const initialState = {isLoading : true};

function getAllTickets(state, action)
{
  return Object.assign({}, state, { isLoading : false  , data : action.data});
}

function addNewTicket(state, action)
{  
  return Object.assign({}, ...state, { ticket : action.data, isLoading : false  });
}

function editTicket(state, action)
{
  return Object.assign({}, state, { errors: action.errors, isLoading : false  });
}

function deleteTicket(state, action)
{
  return Object.assign({}, state, { errors: action.errors, isLoading : false  });
}






