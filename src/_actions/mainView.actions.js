import { mainViewConstants } from '../_constants';
import { mainViewService_del } from '../_services';

export const mainViewActions = {
    displayCurrentSelection,
};

function displayCurrentSelection(selected) {
    return dispatch => {
        dispatch(setCurrentView({ selected }));
        mainViewService_del.getView(selected)
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
