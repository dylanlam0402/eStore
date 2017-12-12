import Fetcher from '../utils/Fetcher';
const SAVE_ITEM_TYPE = '/api/itemtypes/save';
const GET_ITEM_TYPE = '/api/itemtypes/getList';
const DELETE_ITEM_TYPE = '/api/itemtypes/delete';

export default class {
    constructor()
    {
        this.fetcher = new Fetcher();
    }
   


    saveItemType(itemtypes) {
        return this.fetcher.post(SAVE_ITEM_TYPE,itemtypes);
    }

    getItemTypes(){
        return this.fetcher.get(GET_ITEM_TYPE);
    }

    deleteItemType(itemtype){
        return this.fetcher.post(DELETE_ITEM_TYPE, itemtype)
    }
}