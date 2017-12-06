import Fetcher from '../utils/Fetcher';
const ROOT_URL = '/api/auth/signin';
const GET_USERS_URL = ''



export default class {
    constructor()
    {
        this.fetcher = new Fetcher();
    }
    authenticate(username, password, domain) {
        
        return this.fetcher.post(ROOT_URL, {username : username, password : password});
    } 
 
}