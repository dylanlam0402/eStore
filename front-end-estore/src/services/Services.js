import UserService from './UserService';
import IssueService from './IssueService'
import ProjectService from './ProjectService'
import RoleService from './RoleService'
import ItemTypeService from './ItemTypeService'

const userService = new  UserService();
const issueService = new IssueService();
const projectService = new ProjectService();
const roleService = new RoleService();
const itemTypeService = new ItemTypeService();


export {
    userService,issueService,projectService,roleService,itemTypeService
};