
import * as ActionTypes from "../types/ActionTypes";
import { createReducer } from "../utils/reducerUtil";
import _ from 'lodash'


const initialState = { count : 0, cart:[] , qtyTotal : 0, amountTotal : 0 };

function addItemToCart(state, action) {
      const index = state.cart.findIndex((e)=>{ return e.id == action.item.id});
      if(index !== -1){
        const cart = state.cart;
        cart[index].cartQty += action.item.cartQty;
        return { ...state, cart : cart};
      }
      return { ...state, cart : [...state.cart, action.item], count : state.count+1};
  }
  
  function removeItemToCart(state, action) {
    const index = state.cart.findIndex((e)=>{ return e.id == action.item.id});
    state.cart.splice(index,1);
    return {...state, count : state.count -1}
  }


  function adjustItemToCart(state, action) {
    const index = state.cart.findIndex((e)=>{ return e.id == action.item.id});
    let cart = state.cart;
    cart[index].cartQty = action.item.cartQty;
    return { ...state, cart : cart};
  }

  function saveCartRequest(state, action)
  {
    return Object.assign({}, state, {isSaving : true });
  }
  function saveCartSuccess(state, action)
  {
    return Object.assign({}, state, {  data : action.data, isSaving : false  });
  }
  function saveCartFailure(state, action)
  {
    return Object.assign({}, state, { errors : action.errors, isSaving : false  });
  }
  
export const cartReducer = createReducer(initialState, {
  [ActionTypes.ADD_ITEM_TO_CART] : addItemToCart,
  [ActionTypes.REMOVE_ITEM_TO_CART] : removeItemToCart,
  [ActionTypes.EDIT_ITEM_TO_CART] : adjustItemToCart,
  [ActionTypes.SAVE_CART_REQUESTED] : saveCartRequest,
  [ActionTypes.SAVE_CART_SUCCESS] : saveCartSuccess,
  [ActionTypes.SAVE_CART_FAILURE] : saveCartFailure
});







 