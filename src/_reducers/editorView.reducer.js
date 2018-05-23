import { editorViewConstants } from '../_constants';

export function editorView(state = {}, action) {
  switch (action.type) {
    case editorViewConstants.CURRENT_SELECTION:
      return {
        isSelected: true,
        selected: action.selected
      };
    case editorViewConstants.SAVE:
      return {
        saveTrigger: action.data.click,
        comments: action.data.comm
      };
    case editorViewConstants.VIEW:
      return {
        viewMode: action.state
      };
    default:
      return state
  }
}