"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//region
var actions = require("../actions/action/tutorial-action");
exports.initialState = {
    skipState: true,
    welcomeSlides: [],
    defaultDirection: 'ltr'
};
function reducer(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case actions.TOGGLE_SKIP: {
            return {
                skipState: action.payload,
                welcomeSlides: state.welcomeSlides,
                defaultDirection: state.defaultDirection
            };
        }
        case actions.ADD_SLIDES: {
            return {
                skipState: state.skipState,
                welcomeSlides: action.payload,
                defaultDirection: state.defaultDirection
            };
        }
        case actions.ADD_SLIDE: {
            return {
                skipState: state.skipState,
                welcomeSlides: state.welcomeSlides.concat([action.payload]),
                defaultDirection: state.defaultDirection
            };
        }
        case actions.DELETE_SLIDE:
            return {
                skipState: state.skipState,
                welcomeSlides: state.welcomeSlides.filter(function (slide) { return slide.title !== action.payload.title; }),
                defaultDirection: state.defaultDirection
            };
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.getTutorialSlides = function (state) { return state.welcomeSlides; };
exports.getSkipState = function (state) { return state.skipState; };
