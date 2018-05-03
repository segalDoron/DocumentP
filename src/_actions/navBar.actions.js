import { navBarConstants } from '../_constants/navBar.constants';

export const navBarActions = {
    isSaved,
    changeViewState
};

function isSaved(state) {
    return dispatch => {
        dispatch(isSave(state));};

    function isSave(sate) { return { type: navBarConstants.IS_SAVE, state } }
}

function changeViewState(state) {
    return dispatch => {dispatch(changeView(state));};

    function changeView(sate) { return { type: navBarConstants.VIEW, state } }
}