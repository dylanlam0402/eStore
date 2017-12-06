import * as ActionTypes from '../../../../../../types/ActionTypes';
import {projectService} from '../../../../../../services/Services'; 
import { createAction } from '../../../../../../utils/actionUtil';




export const getProjects = () => createAction({
    type: ActionTypes.GET_PROJECTS,
    promise: projectService.getProjects()
});

export const saveProjects = (projects)=> createAction({
    type: ActionTypes.GET_DOMAINS,
    promise: projectService.saveProjects(projects)
});