import { Action } from '@ngrx/store';
import { Slide } from '../../interfaces/tutorial-interface';

export const ADD_SLIDES = 'ADD_SLIDES';
export const ADD_SLIDE = 'ADD_SLIDE';
export const DELETE_SLIDE = 'DELETE_SLIDE';

export const TOGGLE_SKIP = 'TOGGLE_SKIP';



export class ToggleSkipAction implements Action {
    readonly type = TOGGLE_SKIP;

    constructor(public payload: boolean) {
    };
}

export class AddSlideAction implements Action {
    readonly type = ADD_SLIDE;

    constructor(public payload: Slide) {
    };
}

export class DeleteSlideAction implements Action {
    readonly type = DELETE_SLIDE;

    constructor(public payload: Slide) {
    };
}

export class AddSlidesAction implements Action {
    readonly type = ADD_SLIDES;

    constructor(public payload: Slide[]) {
    };
}

export type Actions =
    AddSlidesAction
    | AddSlideAction
    | DeleteSlideAction
    | ToggleSkipAction;
