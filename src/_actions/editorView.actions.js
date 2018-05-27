import { editorViewConstants } from '../_constants';
import { viewService_del } from '../_services';

export const editorViewActions = {
    displayCurrentSelection,
};

function displayCurrentSelection(selected) {
    return dispatch => {
        dispatch(setCurrentView({ selected }));
        viewService_del.getView(selected)
            .then(response => {
                return 'good';
            }).catch(error => {
                console.log(error.message)
            })
    };
    function setCurrentView(selected) {
        if (selected)
            selected = 'is Good';
        return { type: editorViewConstants.CURRENT_SELECTION, selected }
    }
}
