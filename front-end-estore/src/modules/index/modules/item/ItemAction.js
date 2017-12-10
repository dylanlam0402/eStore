import * as ActionTypes from '../../../../types/ActionTypes'
import {itemService} from '../../../../services/Services'; 
import {createAction} from '../../../../utils/actionUtil'


export const saveItem = (item) => createAction({
    type: ActionTypes.SAVE_ITEM,
    promise: itemService.saveItem(item)
});

export const getItems = () => createAction({
    type : ActionTypes.GET_ITEMS,
    promise : itemService.getItems()
})

export const getItem = (id) =>createAction({
    type : ActionTypes.GET_ITEM,
    promise : itemService.getItem(id)
})