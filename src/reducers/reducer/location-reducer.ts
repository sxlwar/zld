import { TimeService } from './../../services/utils/time-service';
import { LocationOptions, TrajectoryOptions, PlayOptions } from './../../interfaces/location-interface';
import { HistoryLocationListResponse, ProjectAreaListResponse } from './../../interfaces/response-interface';
import * as actions from '../../actions/action/location-action';

export interface State {
    historyLocationResponse: HistoryLocationListResponse;
    projectAreaResponse: ProjectAreaListResponse;
    locationOptions: LocationOptions;
    maxEndTime: string;
    trajectoryMaxEndTime: string;
    trajectoryOptions: TrajectoryOptions;
    playOptions: PlayOptions;
}

const timeService = new TimeService();

export const initialState: State = {
    historyLocationResponse: null,
    projectAreaResponse: null,
    locationOptions: {
        date: timeService.getDate(new Date(), true),
        devIds: [],
        endTime: '',
        isTimeSlot: false,
        startTime: '',
        teamIds: [],
        time: timeService.getTime(false),
        userIds: [],
        workTypeIds: []
    },
    maxEndTime: '',
    trajectoryMaxEndTime: '',
    trajectoryOptions: {
        date: timeService.getDate(new Date(), true),
        endTime: '',
        startTime: '',
        userIds: []
    },
    playOptions: {
        userIds: []
    }
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.PROJECT_AREA_LIST_FAIL:
        case actions.PROJECT_AREA_LIST_SUCCESS:
            return Object.assign({}, state, { projectAreaResponse: action.payload });

        case actions.HISTORY_LOCATION_LIST_FAIL:
        case actions.HISTORY_LOCATION_LIST_SUCCESS:
            return Object.assign({}, state, { historyLocationResponse: action.payload });

        case actions.UPDATE_HISTORY_LOCATION_OPTION: {
            const locationOptions = { ...state.locationOptions, ...action.payload }

            return Object.assign({}, state, { locationOptions });
        }

        case actions.RESET_HISTORY_LOCATION_END_TIME:
            const locationOptions = { ...state.locationOptions, endTime: '' };

            return Object.assign({}, state, { locationOptions });

        case actions.UPDATE_TRAJECTORY_OPTIONS: {
            const trajectoryOptions = { ...state.trajectoryOptions, ...action.payload };

            return Object.assign({}, state, { trajectoryOptions });
        }

        case actions.RESET_TRAJECTORY_END_TIME: {
            const trajectoryOptions = { ...state.trajectoryOptions, endTime: '' };

            return Object.assign({}, state, { trajectoryOptions });
        }

        case actions.UPDATE_MAX_END_TIME:
            return { ...state, maxEndTime: action.payload };

        case actions.UPDATE_TRAJECTORY_MAX_END_TIME:
            return { ...state, trajectoryMaxEndTime: action.payload };


        case actions.UPDATE_SELECTED_WORKER_ID: {
            const userIds = updateUserIds(state.locationOptions.userIds, action.payload);

            const locationOptions = { ...state.locationOptions, userIds };

            return { ...state, locationOptions };
        }

        case actions.UPDATE_TRAJECTORY_SELECTED_WORKER_ID: {
            const userIds = updateUserIds(state.trajectoryOptions.userIds, action.payload);

            const trajectoryOptions = { ...state.trajectoryOptions, userIds };

            return { ...state, trajectoryOptions };
        }

        case actions.UPDATE_PLAY_WORKERS:
            return { ...state, playOptions: { userIds: action.payload } };

        case actions.GET_PROJECT_AREA:
        case actions.GET_HISTORY_LOCATION:
        default:
            return state;
    }
}

export function updateUserIds(source: number[], data: { id: number, selected: boolean }): number[] {
    if (data.selected) return [...source, data.id];

    return source.filter(item => item !== data.id);
}

export const getHistoryLocationResponse = (state: State) => state.historyLocationResponse;

export const getProjectAreaResponse = (state: State) => state.projectAreaResponse;

export const getHistoryLocationOptions = (state: State) => state.locationOptions;

export const getMaxEndTime = (state: State) => state.maxEndTime;

export const getTrajectoryOptions = (state: State) => state.trajectoryOptions;

export const getTrajectoryMaxEndTime = (state: State) => state.trajectoryMaxEndTime;

export const getPlayWorkers = (state: State) => state.playOptions.userIds;