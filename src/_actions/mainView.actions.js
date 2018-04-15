import { mainViewConstants } from '../_constants';
import { mainViewService } from '../_services/mainViewService';

export const mainViewActions = {
    displayCurrentSelection
};

function displayCurrentSelection(selected) {
    return dispatch => {
        dispatch(setCurrentView({ selected }));
        mainViewService.getView(selected)
            .then(
                response => {
                    return 'good';
                },
                error => {
                    return 'bad';
                }
            );
    };
    function setCurrentView(selected) {
        if (selected)
            selected = 'is Good';
        return { type: mainViewConstants.CURRENT_SELECTION, selected }
    }
}