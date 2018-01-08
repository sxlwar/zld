import { DeleteImagesResponse } from './../../interfaces/response-interface';
import { DeleteImagesOptions } from './../../interfaces/request-interface';
import { Action } from '@ngrx/store';

export const DELETE_IMAGES = 'DELETE_IMAGES';

export class DeleteImagesAction implements Action {
    readonly type = DELETE_IMAGES;

    constructor(public payload: DeleteImagesOptions) { }
}

export const DELETE_IMAGES_FAIL = 'DELETE_IMAGES_FAIL';

export class DeleteImagesFailAction implements Action {
    readonly type = DELETE_IMAGES_FAIL;

    constructor(public payload: DeleteImagesResponse) { }
}

export const DELETE_IMAGES_SUCCESS = 'DELETE_IMAGES_SUCCESS';

export class DeleteImagesSuccessAction implements Action {
    readonly type = DELETE_IMAGES_SUCCESS;

    constructor(public payload: DeleteImagesResponse) { }
}

export type Actions = DeleteImagesAction
    | DeleteImagesFailAction
    | DeleteImagesSuccessAction;
