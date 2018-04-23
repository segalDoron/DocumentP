import { mainViewConstants } from '../_constants';
import { treeService_bl, mainViewService_del } from '../_services';

export const mainViewActions = {
    displayCurrentSelection,
    setTree
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

function setTree(editorHtml) {
    return dispatch => {
        treeService_bl.setTree(editorHtml)
            .then(
                newTree => {
                    dispatch(setNewTree(newTree));
                    return;
                },
                error => {
                    return 'error';
                }
            );
    };
    function setNewTree(newTree) {
        return { type: mainViewConstants.NEW_TREE, newTree }
    }
}