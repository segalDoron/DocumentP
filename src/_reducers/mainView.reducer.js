import { mainViewConstants } from '../_constants';

export function mainView(state = {}, action) {
  switch (action.type) {
    case mainViewConstants.CURRENT_SELECTION:
      return {
        isSelected: true,
        selected: action.selected
      };
    case mainViewConstants.SAVE:
      return {
        saveTrigger: action.clickE
      };
    case mainViewConstants.VIEW:
      return {
        viewMode: action.state
      };
    default:
      return state
  }
}