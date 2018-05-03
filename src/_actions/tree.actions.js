import { treeConstants } from '../_constants';

export const treeActions = {
    nodeSelected
};

function nodeSelected(treeNodePosition, toggled) {
    return dispatch => {
        dispatch(setSelection(treeNodePosition, toggled));
    };

    function setSelection(treeNodePosition, toggled) { return { type: treeConstants.TREE_NODE_SELECTED, data: { position: treeNodePosition, toggled: toggled } } }
}
