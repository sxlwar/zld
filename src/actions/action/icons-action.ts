import { Action } from '@ngrx/store';
import { State } from '../../reducers/reducer/icons-reducer';
import { RootModuleBadge } from '../../interfaces/icon-interface';

export const ADD_ICONS_BAR = 'ADD_ICONS_BAR';

export class AddIconsBarAction implements Action {
    readonly type = ADD_ICONS_BAR;

    constructor(public payload: State) {
    }
}

export const ADD_BADGE_FOR_ROOT_MODULE = 'ADD_BADGE_FOR_ROOT_MODULE';

export class AddBadgeForRootModuleAction implements Action {
    readonly type = ADD_BADGE_FOR_ROOT_MODULE;

    constructor(public payload: RootModuleBadge) { }
}

export type Actions = AddIconsBarAction
    | AddBadgeForRootModuleAction;

