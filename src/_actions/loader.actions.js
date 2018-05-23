import { loaderConstants } from '../_constants';

export const loaderActions = {
    show
};

function show(show) {
    return dispatch => {
        dispatch(showLoader(show));
    }
    function showLoader(show) { return { type: loaderConstants.SHOW_LOADER, show } }
}