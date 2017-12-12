import Fetcher from '../utils/Fetcher';

const GET_ITEMS_URL = '/api/item/getList';
const SAVE_ITEM_URL = '/api/item/save';
const GET_BRANDS_URL = '/api/item/getBrands';
const SEARCH_ITEM_URL = '/api/item/search';
const GET_ITEM_URL = '/api/item/getOne';
export default class {
    constructor()
    {
        this.fetcher = new Fetcher();
    }
   
    
    getItems() {
        return this.fetcher.get(GET_ITEMS_URL);
    } 
    getItem(id) {
        return this.fetcher.post(GET_ITEM_URL, {id : id});
    } 
    saveItem(item) {
        return this.fetcher.post(SAVE_ITEM_URL, item)
    }

    getBrands(){
        return this.fetcher.get(GET_BRANDS_URL);
    }
    filterItem(itemFilter){
        return this.fetcher.post(SEARCH_ITEM_URL, itemFilter);
    }
}