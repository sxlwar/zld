"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//region
var upload = require("../actions/action/upload-action");
var initialState = {
    uploading: false,
    uploadedState: false,
    uploadResponse: []
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case upload.UPLOAD:
            return {
                uploading: true,
                uploadedState: state.uploadedState,
                uploadResponse: state.uploadResponse
            };
        case upload.UPLOAD_COMPLETE:
            return {
                uploading: false,
                uploadedState: state.uploadedState,
                uploadResponse: action.payload
            };
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.getUploadingState = function (state) { return state.uploading; };
exports.getUploadedState = function (state) { return state.uploadedState; };
exports.getUploadResult = function (state) { return state.uploadResponse; };
