import * as actions from '../../actions/action/location-action';
import { LocationOptions, PlayOptions, PlayState, TrajectoryOptions } from './../../interfaces/location-interface';
import {
    HistoryLocation,
    HistoryLocationListResponse,
    ProjectAreaListResponse,
} from './../../interfaces/response-interface';
import { TimeService } from './../../services/utils/time-service';

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
        workTypeIds: [],
    },
    maxEndTime: '',
    trajectoryMaxEndTime: '',
    trajectoryOptions: {
        date: timeService.getDate(new Date(), true),
        endTime: '',
        startTime: '',
        userIds: [],
    },
    playOptions: {
        userIds: [],
        indexes: [],
        trajectories: [],
        playState: PlayState.stop,
        rateState: 1,
    },
}

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
        case actions.PROJECT_AREA_LIST_FAIL:
        case actions.PROJECT_AREA_LIST_SUCCESS:
            return Object.assign({}, state, { projectAreaResponse: action.payload });

        case actions.HISTORY_LOCATION_LIST_FAIL:
        case actions.HISTORY_LOCATION_LIST_SUCCESS: {
            const userIds = updatePlayOptionUserIds(action.payload.data_loc_list);

            const indexes = playIndexes(userIds, action.payload.data_loc_list);

            const playOptions = { ...state.playOptions, userIds, indexes };

            return Object.assign({}, state, { historyLocationResponse: action.payload, playOptions });
        }

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
            return { ...state, playOptions: { ...state.playOptions, userIds: action.payload, indexes: playIndexes(action.payload, state.historyLocationResponse.data_loc_list) } };

        case actions.UPDATE_PLAY_STATE:
            return { ...state, playOptions: { ...state.playOptions, playState: action.payload } };

        case actions.UPDATE_RATE_STATE:
            return { ...state, playOptions: { ...state.playOptions, rateState: action.payload } };

        case actions.UPDATE_TRAJECTORY:
            return { ...state, playOptions: { ...state.playOptions, trajectories: action.payload } };

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

export function updatePlayOptionUserIds(source: HistoryLocation[]): number[] {
    return source.filter(item => item.loc_list.length).map(item => item.user_id);
}

export function playIndexes(userIds: number[], source: HistoryLocation[]): number[] {
    const target = source.filter(item => !!item.loc_list.length);

    const result = [];

    target.forEach((item, index) => {
        if (userIds.indexOf(item.user_id) !== -1) result.push(index);
    })

    return result;
}

export const getHistoryLocationResponse = (state: State) => state.historyLocationResponse;

export const getProjectAreaResponse = (state: State) => state.projectAreaResponse;

export const getHistoryLocationOptions = (state: State) => state.locationOptions;

export const getMaxEndTime = (state: State) => state.maxEndTime;

export const getTrajectoryOptions = (state: State) => state.trajectoryOptions;

export const getTrajectoryMaxEndTime = (state: State) => state.trajectoryMaxEndTime;

export const getPlayWorkers = (state: State) => state.playOptions.userIds;

export const getTrajectories = (state: State) => state.playOptions.trajectories;

export const getSelectedIndexes = (state: State) => state.playOptions.indexes;

export const getPlayState = (state: State) => state.playOptions.playState;

export const getRateState = (state: State) => state.playOptions.rateState;
