import { treeConstants } from '../_constants';

export const treeActions = {
    nodeSelected
};

function nodeSelected(selectedKeys, info) {
    return dispatch => {
        dispatch(setSelection({ selectedKeys }));       
    };

    function setSelection(selectedKeys) { return { type: treeConstants.TREE_NODE_SELECTED, selectedKeys } }
}
