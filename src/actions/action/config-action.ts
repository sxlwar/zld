import { Action } from '@ngrx/store';

export const SET_PLATFORM_DIRECTION = 'SET_PLATFORM_DIRECTION';

export class SetPlatformDirectionAction implements Action {
    readonly type = SET_PLATFORM_DIRECTION;

    constructor(public payload: string) { }
}

export type Actions = SetPlatformDirectionAction;
