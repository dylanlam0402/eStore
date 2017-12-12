import * as ActionTypes from '../../../../../../types/ActionTypes';
import {itemTypeService, itemService} from '../../../../../../services/Services'; 
import {createAction} from '../../../../../../utils/actionUtil'


export const saveItemType = (itemType) => createAction({
    type: ActionTypes.SAVE_ITEM_TYPE,
    promise: itemTypeService.saveItemType(itemType)
});

export const getItemTypes = () => createAction({
    type : ActionTypes.GET_ITEM_TYPE,
    promise : itemTypeService.getItemTypes()
})
export const deleteItemType=(itemType) => createAction({
    type : ActionTypes.DELETE_ITEM_TYPE,
    promise : itemTypeService.deleteItemType(itemType)
})