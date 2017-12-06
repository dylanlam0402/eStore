import Fetcher from '../utils/Fetcher';
const ROOT_URL = '/api/role';
const GET_ROLES_URL = '/api/role/getRoles';


export default class {
    constructor()
    {
        this.fetcher = new Fetcher();
    }
   
    
    getRoles() {
        return this.fetcher.get(GET_ROLES_URL);
    } 
}