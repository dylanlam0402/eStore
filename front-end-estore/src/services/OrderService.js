import Fetcher from '../utils/Fetcher';

const SAVE_ORDER_URL = '/api/order/save';


export default class {
    constructor()
    {
        this.fetcher = new Fetcher();
    }
   
  m
    saveOrder(order) {
        return this.fetcher.post(SAVE_ORDER_URL,order);
    }

}