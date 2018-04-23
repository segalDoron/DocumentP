import { navBarConstants } from '../_constants/navBar.constants';

export const navBarActions = {
    isSaved
};

function isSaved(state) {
    return dispatch => {dispatch(isSave(state));};

    function isSave(sate) { return { type: navBarConstants.IS_SAVE, state } }
}