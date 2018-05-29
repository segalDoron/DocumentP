import { treeConstants } from '../_constants';
import { treeService_dal } from '../_services'

export const treeActions = {
    nodeSelected,
    getTree,
};

function nodeSelected(treeNodePosition, trigger) {
    return dispatch => {
        dispatch(setSelection(treeNodePosition, trigger));
    };

    function setSelection(treeNodePosition, trigger) { return { type: treeConstants.TREE_NODE_SELECTED, data: { position: treeNodePosition, trigger: trigger } } }
}

function getTree(user) {
    return dispatch => {
        treeService_dal.getTree(user).then(response => {
            dispatch(setTree(response));
        }).catch(error => {
            alert("cant get tree data")
            dispatch(setTree([]));
        })
    };

    function setTree(newTree) { return { type: treeConstants.NEW_TREE, newTree } }
}
