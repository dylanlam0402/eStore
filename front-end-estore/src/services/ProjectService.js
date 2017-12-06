import Fetcher from '../utils/Fetcher';
const ROOT_URL = '/api/project';
const GET_PROJECTS_URL = '/api/users';
const SAVE_PROJECTS_URL = 'api/project/saveProjects'

export default class {
    constructor()
    {
        this.fetcher = new Fetcher();
    }
   
    
    getProjects() {
        return this.fetcher.get(GET_PROJECTS_URL);
    } 

    saveProjects(projects) {
        return this.fetcher.post(SAVE_PROJECTS_URL,projects);
    }

}