import { ProjectListResponse } from './../../interfaces/response-interface';
import { Project } from '../../interfaces/response-interface';
import * as actions from '../../actions/action/project-action';

export interface State {
    response: ProjectListResponse;
    selectedProject: Project;
}

export const initialState: State = {
    response: null,
    selectedProject: null
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.PROJECT_LIST_FAIL:
            return { ...state, response: action.payload };

        case actions.PROJECT_LIST_SUCCESS:
            const { projects } = action.payload;

            if (state.selectedProject && projects.some(project => project.id === state.selectedProject.id)) {
                return { ...state, selectedProject: state.selectedProject };
            } else {
                return { selectedProject: projects[0], response: action.payload };
            }

        case actions.SELECT_PROJECT:
            return { ...state, selectedProject: state.response.projects.find(project => project.id === action.payload) }

        case actions.GET_PROJECT_LIST:
        case actions.GET_CURRENT_PROJECTS:
        default:
            return state;
    }
}

export const getSelectedProject = (state: State) => state.selectedProject;

export const getProjectResponse = (state: State) => state.response;
