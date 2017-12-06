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