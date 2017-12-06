import Fetcher from '../utils/Fetcher';
const GET_ALL_ISSUES_URL = '/api/issue/getAllIssue';
const GET_WEEK_BY_MONTH = '';
const GET_ISSUE_BY_WEEK = '';
const CREATE_ISSUE_URL = '...';
const EDIT_ISSUE_URL = '...';
const REMOVE_ISSUE_URL = '...';
const ADD_ISSUE_URL = '...';
const GET_WEEKS_URL = '/api/issue/getWeekGroups' 
const GET_ISSUES_BY_WEEK_URL = '/api/issue/getIssuesByUser'

export default class {
    constructor()
    {
        this.fetcher = new Fetcher();
    }

    getWeeksData(month,year) {
        
        return this.fetcher.get(GET_WEEKS_URL+"/"+month+'/'+year)
    }
    getIssuesByWeek(startDate,endDate){
        
        return this.fetcher.get(encodeURI(GET_ISSUES_BY_WEEK_URL+"/"+startDate+'/'+endDate))
    }

    createIssue(issue) {
        return this.fetcher.post(ADD_ISSUE_URL, issue);
    } 

    editIssue(issue) {
        return this.fetcher.post(EDIT_ISSUE_URL, issue);
    } 

    removeIssue(issueId) {
        return this.fetcher.post(REMOVE_ISSUE_URL, {issueId : issueId});
    }


}