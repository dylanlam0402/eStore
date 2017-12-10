import Fetcher from '../utils/Fetcher';

const SAVE_CUSTOMER_URL = '/api/customer/save';


export default class {
    constructor()
    {
        this.fetcher = new Fetcher();
    }
   
  
    saveCustomer(customer) {
        return this.fetcher.post(SAVE_CUSTOMER_URL,customer);
    }

}