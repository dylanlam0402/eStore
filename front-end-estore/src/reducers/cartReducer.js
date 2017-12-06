
import * as ActionTypes from "../types/ActionTypes";
import { createReducer } from "../utils/reducerUtil";
import _ from 'lodash'

const initialState = { count : 0, cart:[] , qtyTotal : 0, amountTotal : 0 };

function addItemToCard(state, action) {
    return { ...state, cart : [...state.cart, action.item], count : state.count+1};
  }
  
  function removeItemToCard(state, action) {
    return [...state];
  }
  function getIssuesByWeekFailure(state, action) {
    return [...state];
  }

export const cartReducer = createReducer(initialState, {
  [ActionTypes.ADD_ITEM_TO_CART] : addItemToCard

});






 