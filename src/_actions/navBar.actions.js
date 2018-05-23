import { navBarConstants, loaderConstants } from '../_constants';
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
        $(".ql-editor img").remove()
        const inner = $(".ql-editor").children();
        const hasHeaders = $(".ql-editor").find('h1,h2,h3,h4');
        const hasComments = $(".ql-editor").find('#comment');
        treeService_bl.setTree(inner, hasHeaders,hasComments).then(
            response => {
                dispatch(setNewTree(response.tree));
                dispatch(saveView(clickE, response.comments));
                dispatch(showLoader(false));
                return;
            },
            error => {
                return 'Error';
            }
        );
        function showLoader(show) { return { type: loaderConstants.SHOW_LOADER, show } }
        function setNewTree(newTree) { return { type: navBarConstants.NEW_TREE, newTree } }
        function saveView(clickE, comments) { return { type: navBarConstants.SAVE, data: { click: clickE, comm: comments } } }
    }
}