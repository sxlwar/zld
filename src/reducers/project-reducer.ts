import {Project} from '../interfaces/response-interface';
import * as actions from '../actions/project-action';

export interface State {
  count: number;
  projects: Project[];
  selectedProject: Project;
  information?: string;
  errorMessage?: string;
}

export const initialState: State = {
  count: NaN,
  projects: [],
  selectedProject: null
};

// export const initialState: ProjectListResponse = {count: NaN, projects: []};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.PROJECT_LIST_FAIL:
      return {...state, ...action.payload};

    case actions.PROJECT_LIST_SUCCESS:
      const projects = action.payload.projects;

      if (state.selectedProject && projects.some(project => project.id === state.selectedProject.id)) {
        return {...action.payload, selectedProject: state.selectedProject};
      }

      return {...action.payload, selectedProject: projects[0]};

    case actions.SELECT_PROJECT:
      const target = state.projects.find(project => project.id === action.payload);

      return Object.assign({}, state, {selectedProject: target});

    case actions.GET_PROJECT_LIST:
    case actions.GET_CURRENT_PROJECTS:
    default:
      return state;
  }
}

export const getSelectedProject = (state: State) => state.selectedProject;

export const getCurrentProjects = (state: State) => state.projects;
