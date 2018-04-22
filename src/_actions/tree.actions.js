import { treeConstants } from '../_constants';

export const treeActions = {
    nodeSelected
};

function nodeSelected(treeNodeName) {
    return dispatch => {
        dispatch(setSelection( treeNodeName ));       
    };

    function setSelection(treeNodeName) { return { type: treeConstants.TREE_NODE_SELECTED, treeNodeName } }
}
