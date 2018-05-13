import { treeConstants } from '../_constants';

export const treeActions = {
    nodeSelected
};

function nodeSelected(treeNodePosition, trigger) {
    return dispatch => {
        dispatch(setSelection(treeNodePosition, trigger));
    };

    function setSelection(treeNodePosition, trigger) { return { type: treeConstants.TREE_NODE_SELECTED, data: { position: treeNodePosition, trigger: trigger } } }
}
