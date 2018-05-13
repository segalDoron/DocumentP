import { treeConstants } from '../_constants';

export function tree(state = {}, action) {
  switch (action.type) {
    case treeConstants.TREE_NODE_SELECTED:
      return {
        selected: action.data.position,
        nodeTriggered: action.data.trigger
      };
    case treeConstants.NEW_TREE:
      return {
        treeData: action.newTree
      };
    default:
      return state
  }
}