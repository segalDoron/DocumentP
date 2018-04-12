import { treeConstants } from '../_constants';

export function tree(state = {}, action) {
  switch (action.type) {
    case treeConstants.TREE_NODE_SELECTED:
      return{
        selected: action.selectedKeys        
      };
    default:
      return state
  }
}