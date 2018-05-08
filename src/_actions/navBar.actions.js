import { navBarConstants, mainViewConstants } from '../_constants';
import { treeService_bl } from '../_services';
import $ from 'jquery';

export const navBarActions = {
    changeViewState,
    save
};

function changeViewState(state) {
    return dispatch => { dispatch(changeView(state)); };

    function changeView(sate) { return { type: navBarConstants.VIEW, state } }
}

function save(clickE) {
    return dispatch => {
        const inner = $(".ql-editor").children();
        treeService_bl.setTree(inner).then(
            newTree => {
                dispatch(setNewTree(newTree));
                dispatch(saveView(clickE));
                return;
            },
            error => {
                return 'error';
            }
        );
        function setNewTree(newTree) {
            return { type: navBarConstants.NEW_TREE, newTree }
        }
        function saveView(clickE) {
            return { type: mainViewConstants.SAVE, clickE }
        }
    }
}