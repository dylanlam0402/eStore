import * as ActionType from '../../../../types/ActionTypes'



export const addItemToCart= (item) =>{
    return {
        type : ActionType.ADD_ITEM_TO_CART,
        item : item
    }
}
export const removeItemToCart = (item) =>{
    return {
        type : ActionType.REMOVE_ITEM_TO_CART,
        item : item
    }
}
export const adjustItemToCart = (item) =>{
    return {
        type : ActionType.EDIT_ITEM_TO_CART,
        item : item
    }
}
export const saveOrder = (customer, order) =>  ( {
    type: ActionType.SAVE_ORDER,
    customer: customer,
    order : order
});

